import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NotificationService } from "../../../../generales/_services/notification.service";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { CorporativoUpdateData } from "../_models/corporativo-update-data.interface";
import { CorporativosService } from "../_services/corporativos.service";
import { ContactoData } from "./_models/contacto-data.interface";
import { CorporativoDetalleData } from "./_models/corporativo-detalle-data.interface";
import { CorporativosDetalleService } from "./_services/corporativos-detalle.service";

@Component({
    selector: "app-corporativos-detalle",
    templateUrl: "./corporativos-detalle.component.html",
    styleUrls: ["./corporativos-detalle.component.scss"],
})
export class CorporativosDetalleComponent implements OnInit {
    public hasEdited: boolean = false;
    public ColumnMode = ColumnMode;
    public isDisabledForm: boolean = true;
    public corporativoDetalle: CorporativoDetalleData;
    public detalleCorporativoForm: FormGroup;
    public contactsForm: FormGroup;
    public contacts = [];
    public contactoEnEdicion: {
        celular: number;
        email: string;
        id: number;
        nombre: string;
        observaciones: string;
        puesto: string;
        telefono: number;
        tw_corporativo_id: number;
    };

    constructor(
        private corporativosService: CorporativosService,
        private corporativoDetalleService: CorporativosDetalleService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private notificationService: NotificationService
    ) {
        this.corporativoDetalle = {
            logo: "",
            corto: "",
            completo: "",
            status: "",
            incorporacion: "",
            url: "",
        };
    }

    ngOnInit(): void {
        this.getCorporativoDetalle();
        this.initFormDetalle();
        this.initFormContact();
        this.setContactsOnTable();
    }

    public getCorporativoDetalle(): void {
        this.activatedRoute.data.subscribe(
            ({ detalleCorporativo: { data } }) => {
                const {
                    corporativo: {
                        id,
                        S_LogoURL: logo,
                        S_NombreCorto: corto,
                        S_NombreCompleto: completo,
                        D_FechaIncorporacion: incorporacion,
                        S_Activo: status,
                        S_SystemUrl: url,
                        FK_Asignado_id: idAsignado,
                    },
                } = data;

                this.corporativoDetalle.id = id;
                this.corporativoDetalle.logo = logo;
                this.corporativoDetalle.corto = corto;
                this.corporativoDetalle.completo = completo;
                this.corporativoDetalle.status = status.toString();
                this.corporativoDetalle.incorporacion = this.datePipe.transform(
                    incorporacion,
                    "yyyy-MM-dd"
                );
                this.corporativoDetalle.url = url;
                this.corporativoDetalle.idAsignado = idAsignado;
            }
        );
    }

    public initFormDetalle(): void {
        this.detalleCorporativoForm = this.formBuilder.group({
            corto: [
                { value: this.corporativoDetalle.corto, disabled: true },
                [Validators.required],
            ],
            completo: [
                {
                    value: this.corporativoDetalle.completo,
                    disabled: true,
                },
                [Validators.required],
            ],
            status: [
                { value: this.corporativoDetalle.status, disabled: true },
                [Validators.required],
            ],
            incorporacion: [
                {
                    value: this.corporativoDetalle.incorporacion,
                    disabled: true,
                },
                [Validators.required],
            ],
            url: [
                {
                    value: this.corporativoDetalle.url,
                    disabled: true,
                },
                [Validators.required],
            ],
        });
    }

    public initFormContact(): void {
        this.contactsForm = this.formBuilder.group({
            nombre: ["", [Validators.required]],
            puesto: ["", [Validators.required]],
            telefono: ["", [Validators.pattern(/^[0-9]\d*$/)]],
            celular: ["", [Validators.pattern(/^[0-9]\d*$/)]],
            email: ["", [Validators.email, Validators.required]],
            comentarios: [""],
        });
    }

    public setFormContactData(idContacto: number): void {
        this.hasEdited = true;

        const [contactoData] = this.contacts.filter(
            ({ id }) => id === idContacto
        );

        this.contactoEnEdicion = contactoData;

        const {
            nombre,
            puesto,
            telefono,
            celular,
            email,
            observaciones,
        } = contactoData;

        this.contactsForm.setValue({
            nombre,
            puesto,
            telefono,
            celular,
            email,
            comentarios: observaciones,
        });
    }

    public setContactsOnTable(): void {
        this.activatedRoute.data.subscribe(
            ({
                detalleCorporativo: {
                    data: {
                        corporativo: { tw_contactos_corporativo },
                    },
                },
            }) => {
                const rowContacts = tw_contactos_corporativo.map((contact) => {
                    const {
                        id,
                        N_TelefonoFijo,
                        N_TelefonoMovil,
                        S_Comentarios,
                        S_Email,
                        S_Nombre,
                        S_Puesto,
                        tw_corporativo_id,
                    } = contact;

                    return {
                        id,
                        telefono: N_TelefonoFijo,
                        celular: N_TelefonoMovil,
                        observaciones: S_Comentarios,
                        email: S_Email,
                        nombre: S_Nombre,
                        puesto: S_Puesto,
                        tw_corporativo_id,
                    };
                });

                this.contacts = [...rowContacts];
            }
        );
    }

    public onSubmit(): void {
        if (this.isDisabledForm) {
            this.isDisabledForm = false;
            this.detalleCorporativoForm.enable();
            return;
        }

        const corporativo: CorporativoUpdateData = {
            id: this.corporativoDetalle.id,
            S_NombreCorto: this.detalleCorporativoForm.get("corto").value,
            S_NombreCompleto: this.detalleCorporativoForm.get("completo")
                .value,
            S_LogoURL: this.corporativoDetalle.logo,
            S_Activo: Number(this.detalleCorporativoForm.get("status").value),
            FK_Asignado_id: this.corporativoDetalle.idAsignado,
            D_FechaIncorporacion: this.detalleCorporativoForm.get(
                "incorporacion"
            ).value,
        };

        this.corporativosService
            .updateCorporativo(corporativo.id, corporativo)
            .subscribe(
                () => {
                    this.notificationService.notifySuccess(
                        "Actualizado",
                        "Se actualizó el corporativo correctamente"
                    );
                },
                () => {
                    this.notificationService.notifyError(
                        "Error",
                        "Hubo un error al actualizar el corporativo"
                    );
                }
            );
    }

    public onSubmitContact(): void {
        if (!this.hasEdited) {
            this.createContact();
            return;
        }

        this.updateContact();
    }

    public updateContact(): void {
        const { id: idContacto, tw_corporativo_id } = this.contactoEnEdicion;

        if (this.contactsForm.invalid) {
            this.notificationService.notifyError(
                "Error",
                "Los datos no coinciden"
            );
            return;
        }

        const updateTableRow = (idContact: number, contactData) => {
            const updatedRowIndex = this.contacts.findIndex(
                ({ id }) => idContact === id
            );

            this.contacts[updatedRowIndex] = contactData;

            this.contacts = [...this.contacts];
        };

        const updateContactData: ContactoData = {
            S_Nombre: this.contactsForm.get("nombre").value,
            S_Puesto: this.contactsForm.get("puesto").value,
            N_TelefonoFijo: this.contactsForm.get("telefono").value,
            N_TelefonoMovil: this.contactsForm.get("celular").value,
            S_Email: this.contactsForm.get("email").value,
            S_Comentarios: this.contactsForm.get("comentarios").value,
            tw_corporativo_id: tw_corporativo_id,
        };

        this.corporativoDetalleService
            .updateContacto(idContacto, updateContactData)
            .subscribe((response) => {
                const contactCreated: ContactoData = response.data;
                const infoRowContact = {
                    id: contactCreated.id,
                    nombre: contactCreated.S_Nombre,
                    observaciones: contactCreated.S_Comentarios,
                    puesto: contactCreated.S_Puesto,
                    telefono: contactCreated.N_TelefonoFijo,
                    celular: contactCreated.N_TelefonoMovil,
                    email: contactCreated.S_Email,
                    tw_corporativo_id: contactCreated.tw_corporativo_id,
                };

                updateTableRow(idContacto, infoRowContact);

                this.contactsForm.reset();
                this.notificationService.notifySuccess(
                    "Actualizado",
                    "Se actualizó el contacto correctamente"
                );
            });
    }

    public createContact(): void {
        if (this.contactsForm.invalid) {
            this.notificationService.notifyError(
                "Error",
                "Los datos no coinciden"
            );
            return;
        }

        const addTableRow = (rowData: object) => {
            this.contacts = [...this.contacts, rowData];
        };

        const nuevoContacto: ContactoData = {
            S_Nombre: this.contactsForm.get("nombre").value,
            S_Puesto: this.contactsForm.get("puesto").value,
            N_TelefonoFijo: this.contactsForm.get("telefono").value,
            N_TelefonoMovil: this.contactsForm.get("celular").value,
            S_Email: this.contactsForm.get("email").value,
            S_Comentarios: this.contactsForm.get("comentarios").value,
            tw_corporativo_id: this.corporativoDetalle.id,
        };

        this.corporativoDetalleService.addContact(nuevoContacto).subscribe(
            (response) => {
                const contactCreated: ContactoData = response.data;
                const infoRowContact = {
                    id: contactCreated.id,
                    nombre: contactCreated.S_Nombre,
                    observaciones: contactCreated.S_Comentarios,
                    puesto: contactCreated.S_Puesto,
                    telefono: contactCreated.N_TelefonoFijo,
                    celular: contactCreated.N_TelefonoMovil,
                    email: contactCreated.S_Email,
                    tw_corporativo_id: contactCreated.tw_corporativo_id,
                };

                addTableRow(infoRowContact);
                this.contactsForm.reset();
                this.notificationService.notifySuccess(
                    "Creado",
                    "Se creó el contacto correctamente"
                );
            },
            () => {
                this.notificationService.notifyError(
                    "Error",
                    "Hubo un error al crear el contacto"
                );
            }
        );
    }

    public onDeleteContacto(idContacto: number) {
        const deleteTableRow = (idContact: number) => {
            const updatedRows = this.contacts.filter(
                ({ id }) => idContact !== id
            );

            this.contacts = [...updatedRows];
        };

        this.corporativoDetalleService.deleteContacto(idContacto).subscribe(
            () => {
                deleteTableRow(idContacto);
                this.notificationService.notifySuccess(
                    "Eliminado",
                    "Se eliminó el contacto correctamente"
                );
            },
            () =>
                this.notificationService.notifyError(
                    "Error",
                    "Hubo un error al eliminar el contacto"
                )
        );
    }
}
