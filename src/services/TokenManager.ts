import jwtDecode from "jwt-decode";
import { IToken } from './IToken';
import { TokenDTO } from './TokenDTO';


export class TokenManager
{
  private _token: IToken;
  private _updateTokenTimeoutId: number;
  private readonly _baseUri: string;
  public get token(): Readonly<IToken>
  {
    return this._token;
  }

  public constructor(baseUrl: string)
  {
    this._baseUri = baseUrl;
  }

  public getAuthProviderPath(): Promise<string>
  {
    return fetch(this._baseUri + "/auth/provider").then(r => r.text());
  }

  public loginByCode(code: string): Promise<void>
  {
    return fetch(this._baseUri + "/auth/token-bycode" + new URLSearchParams({
      code,
      redirect_uri: "http://localhost:5050/test-auth-code"
    }))
      .then(r => r.json())
      .then((tokenDto: Partial<TokenDTO>) =>
      {
        this.setToken(tokenDto);
      });
  }

  public updateToken(): Promise<void>
  {
    debugger;
    return fetch(this._baseUri + "/auth/update-token" + new URLSearchParams({
      "refresh_token": this._token.refreshToken
    }))
    .then(r => r.json())
    .then((tokenDto: Partial<TokenDTO>) => this.setToken(tokenDto));
  }

  private setToken(tokenDTO: Partial<TokenDTO>): void
  {
    if (!tokenDTO.access_token || !tokenDTO.refresh_token)
    {
      console.log(tokenDTO);
      throw new Error("invalid token");
    }
    this._token = { accessToken: tokenDTO.access_token, refreshToken: tokenDTO.refresh_token };
    this.setRefresh();
  }

  private setRefresh()
  {
    if (this._updateTokenTimeoutId)
    {
      clearTimeout(this._updateTokenTimeoutId);
    }

    const expired = (jwtDecode(this._token.accessToken) as any).exp * 1000;
    const delay = expired - Date.now() - 5 * 1000;
    this._updateTokenTimeoutId = window.setTimeout(() =>
    {
      this.updateToken();
    }, delay);
    debugger;
  }
}