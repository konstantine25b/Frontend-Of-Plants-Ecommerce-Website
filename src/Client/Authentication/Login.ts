import axios, { AxiosInstance, AxiosResponse } from "axios";

interface AuthTokens {
  access: string;
  refresh: string;
}

export class AuthClient {
  private axiosInstance: AxiosInstance;
  private accessToken: string | null = null;
  private refreshToken: string | null = null;
  private tokenRefreshTimeout: NodeJS.Timeout | null = null;

  private clearTokenRefreshTimeout(): void {
    if (this.tokenRefreshTimeout) {
      clearTimeout(this.tokenRefreshTimeout);
      this.tokenRefreshTimeout = null;
    }
  }

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL,
    });
    this.setupInterceptors();
    this.loadTokensFromStorage();
    this.scheduleTokenRefresh();
  }

  private setupInterceptors() {
    // Add response interceptor to handle token refresh and 401 errors
    const interceptor = this.axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            // Eject the interceptor to prevent infinite loop
            this.axiosInstance.interceptors.response.eject(interceptor);
            console.log(32);
            await this.refreshTokens();
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure (e.g., log out user, display error message)
            console.error("Failed to refresh tokens:", refreshError);
            // For example, log out the user
            // this.logout();
          }
        }
        return Promise.reject(error);
      }
    );
  }

  private loadTokensFromStorage() {
    this.accessToken = localStorage.getItem("accessToken");
    this.refreshToken = localStorage.getItem("refreshToken");
  }

  private saveTokensToStorage() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.setItem("accessToken", this.accessToken || "");
    localStorage.setItem("refreshToken", this.refreshToken || "");
  }

  private scheduleTokenRefresh() {
    this.clearTokenRefreshTimeout();
    if (this.accessToken) {
      const decodedToken = this.decodeToken(this.accessToken);
      if (decodedToken && typeof decodedToken.exp === "number") {
        const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds
        const refreshTime = expirationTime - Date.now() - 60000; // Refresh 1 minute before expiration
        if (refreshTime > 0) {
          this.tokenRefreshTimeout = setTimeout(
            () => this.refreshTokens(),
            refreshTime
          );
        }
      }
    }
  }

  private decodeToken(token: string): { [key: string]: any } | null {
    try {
      const payload = token.split(".")[1];

      return JSON.parse(atob(payload));
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  }

  public async login(username: string, password: string): Promise<void> {
    try {
      const response: AxiosResponse<AuthTokens> = await this.axiosInstance.post(
        "/api/token/",
        {
          username,
          password,
        }
      );

      // Check if both access and refresh tokens are present
      if (response.data.access && response.data.refresh) {
        this.accessToken = response.data.access;
        this.refreshToken = response.data.refresh;
        this.saveTokensToStorage();
        this.scheduleTokenRefresh();
      } else {
        console.error(
          "Access token or refresh token is missing in the login response"
        );
        throw new Error("Failed to login: Missing tokens");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Handle incorrect credentials error
        console.error("Incorrect username or password");
        throw new Error("Incorrect username or password");
      } else {
        // Handle other errors
        this.handleRequestError(error);
        throw new Error("Failed to login");
      }
    }
  }

  public async refreshTokens(): Promise<void> {
    try {
      if (!this.refreshToken) {
        throw new Error("Refresh token is missing");
      }

      const response: AxiosResponse<AuthTokens> = await this.axiosInstance.post(
        "/api/token/refresh/",
        {
          refresh: this.refreshToken,
        }
      );

      // Check if new access token is received
      if (response.data.access) {
        this.accessToken = response.data.access;
        this.saveTokensToStorage();
        this.scheduleTokenRefresh();
      } else {
        console.error("Failed to refresh tokens: New access token missing");
        throw new Error("Failed to refresh tokens: New access token missing");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        // Handle invalid refresh token error
        console.error("Failed to refresh tokens: Refresh token is invalid");
        // You may want to handle this case differently, such as logging out the user
        // this.logout();
      } else {
        this.handleRequestError(error);
        throw new Error("Failed to refresh tokens");
      }
    }
  }

  private handleRequestError(error: any): void {
    console.error("Request failed:", error);
    throw new Error("Failed to perform authentication request");
  }
}

// Instantiate AuthClient with base URL
const baseUrl = "http://164.92.170.208";
export const authClient = new AuthClient(baseUrl);
