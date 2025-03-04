import { HttpInterceptorFn,HttpInterceptor,HttpEvent , HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
    
// export const globalInterceptor: HttpInterceptorFn = (req, next) => {

//   const token = localStorage.getItem('token')
//       const baseUrl: string = 'https://upskilling-egypt.com:3000/api/v0'
    
//       let cloned = req.clone({
//    setHeaders:{ 'Authorization': `Bearer ${token}`},
//    url:req.url.includes('assets')? req.url : baseUrl+req.url
//   })
//   return next(cloned);
// };
@Injectable()
export class globalInterceptor implements HttpInterceptor {
  private readonly baseUrl: string = 'https://upskilling-egypt.com:3000/api/v0';

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
 
    const clonedRequest = request.clone({
      setHeaders: token ? { Authorization: `Bearer ${token}` } : {},
      url: request.url.includes('assets') ? request.url : `${this.baseUrl}${request.url}`
    });

    return next.handle(clonedRequest);
  }

}