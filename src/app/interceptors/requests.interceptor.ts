import { Injectable } from "@angular/core";
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpHeaders,
} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class RequestsInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        let headersValues: any = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };

        const token: string = localStorage.getItem("tokenscloud");

        if (token) {
            headersValues = {
                ...headersValues,
                Authorization: `Bearer ${token}`,
            };
        }

        const modifiedRequest: HttpRequest<any> = request.clone({
            headers: new HttpHeaders(headersValues),
        });

        return next.handle(modifiedRequest);
    }
}
