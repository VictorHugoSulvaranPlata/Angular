import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { ContactoData } from "../_models/contacto-data.interface";

@Injectable({
    providedIn: "root",
})
export class CorporativosDetalleService {
    constructor(private http: HttpClient) {}

    updateContacto(
        id: number,
        contacto: ContactoData
    ): Observable<any> {
        return this.http.put(
            `${environment.apiURL}/contactos/${id}`,
            contacto
        );
    }

    deleteContacto(id: number): Observable<any> {
        return this.http.delete(
            `${environment.apiURL}/contactos/${id}`
        );
    }

    addContact(contacto: ContactoData): Observable<any> {
        return this.http.post(`${environment.apiURL}/contactos`, contacto);
    }
}
