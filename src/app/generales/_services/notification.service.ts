import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import swal from "sweetalert2";

@Injectable({
    providedIn: "root",
})
export class NotificationService {
    constructor(private http: HttpClient) {}

    public notifySuccess(title: string, message: string): void {
        swal.fire({
            title,
            text: message,
            icon: "success",
            customClass: {
                confirmButton: "btn btn-success",
            },
            buttonsStyling: false,
        });
    }

    public notifyError(title: string, message: string): void {
        swal.fire({
            title,
            text: message,
            icon: "error",
            customClass: {
                confirmButton: "btn btn-danger",
            },
            buttonsStyling: false,
        });
    }
}
