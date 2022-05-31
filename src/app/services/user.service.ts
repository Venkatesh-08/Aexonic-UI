import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API,API_ENDPOINT_URL } from '../../../constant';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private dataSource: BehaviorSubject<string> = new BehaviorSubject<string>(' ');
    data: Observable<string> = this.dataSource.asObservable();
    constructor(private http: HttpClient) { }

    sendData(data: string) {
        this.dataSource.next(data);
    }

    getUsersByPage(pageNo:any, pageSize:any){
        return this.http.get(API_ENDPOINT_URL+`list?start=${pageNo}&limit=${pageSize}`);
    }

    getUsersBySearch(start:any,limit:any,search:string){
        return this.http.get(API_ENDPOINT_URL+`list?start=${start}&limit=${limit}&search=${search}`);
    }

    getUsersBySearchApi(start:any,limit:any,search:string){
        if(search){
            return this.http.get(API_ENDPOINT_URL+`search?start=${start}&limit=${limit}&search=${search}`);
        }
        return this.http.get(API_ENDPOINT_URL+`list?start=${start}&limit=${limit}&search=${search}`);
    }

    listById(id:any){
        return this.http.get(API_ENDPOINT_URL+`listById?id=${id}`); 
    }

    updateUser(data:any){
        return this.http.put(API_ENDPOINT_URL+`updateUser`, data);
    }

}