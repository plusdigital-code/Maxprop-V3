import { Component } from '@angular/core';
import { FormioResourceEditComponent } from 'angular-formio/resource';
declare var $: any;
@Component({
    selector: 'app-edit',
    templateUrl: './user-edit.component.html',
})
export class EditComponent extends FormioResourceEditComponent {
    password:any;
    ispass = true;
    ngDoCheck() {
        
        var passwordElement = document.getElementsByClassName("formio-component-password");
        if (this.service.resource.data && this.service.resource.data.password && this.ispass) {
            this.password = this.service.resource.data.password;
            this.ispass = false;
            //$(".formio-component-password").hide();
        }
        $('button.btn-wizard-nav-next').on("click", function () {
            window.scrollTo(0, 0);
        });
        $('button.btn-wizard-nav-previous').on("click", function () {
            window.scrollTo(0, 0);
        });
    }
    submitPasswordDelete(submission) {
        if (this.password == submission.data.password) {
            delete submission.data.password;
        }
    }
}
