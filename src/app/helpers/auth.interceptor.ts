import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("id_token");


        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                "Bearer " + idToken)
            });
            console.log(cloned)
            console.log("its cloned")
            return next.handle(cloned);
        }
        else {
            console.log(req)
            console.log("call made!!")
            let httpAuth = req.headers.get('Authorization');
            httpAuth = 'adding value from interceptor' + httpAuth;
            req.headers.set('Authorization',httpAuth);
            console.log(httpAuth)
            return next.handle(req);
        }
    }
}