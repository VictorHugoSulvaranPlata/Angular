import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";
import { Observable } from "rxjs";
import { CorporativoUpdateData } from "../_models/corporativo-update-data.interface";

@Injectable({
    providedIn: "root",
})
export class CorporativosService {
    constructor(private http: HttpClient) {}

    getCorporativos(): Observable<any> {
        return this.http.get(`${environment.apiURL}/corporativos`);
    }

    getCorporativo(idCorporativo: string): Observable<any> {
        return this.http.get(
            `${environment.apiURL}/corporativos/${idCorporativo}`
        );
    }

    updateCorporativo(
        idCorporativo: number,
        corporativo: CorporativoUpdateData
    ): Observable<any> {
        return this.http.put(
            `${environment.apiURL}/corporativos/${idCorporativo}`,
            corporativo
        );
    }
}
