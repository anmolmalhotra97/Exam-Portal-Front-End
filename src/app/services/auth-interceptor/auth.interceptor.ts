import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { LoginService } from "../login-service/login.service";

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private loginService: LoginService) { }

    //Intercept any outgoing HTTP Request and add JWT Token to the Request Header
    intercept(req: HttpRequest<any>, next: HttpHandler)
        : Observable<HttpEvent<any>> {
        //Add JWT Token from Local Storage to Request Header
        const token = this.loginService.getToken();
        if (token != null) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        //If Token is not present in Local Storage, then do not add Authorization Header
        return next.handle(req);
    }
}

export const authenticationInterceptorProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptorService,
        multi: true
    }
];