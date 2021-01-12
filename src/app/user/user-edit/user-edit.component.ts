import { Component } from '@angular/core';
import { FormioResourceEditComponent } from 'angular-formio/resource';
declare var $: any;
@Component({
    selector: 'app-edit',
    templateUrl: './user-edit.component.html',
})
export class EditComponent extends FormioResourceEditComponent {
    ngDoCheck() {
        var passwordElement = document.getElementsByClassName("formio-component-password");
        if (passwordElement.length > 0) {
            $(".formio-component-password").hide();
        }
        $('button.btn-wizard-nav-next').on("click", function () {
            window.scrollTo(0, 0);
        });
        $('button.btn-wizard-nav-previous').on("click", function () {
            window.scrollTo(0, 0);
        });
    }
    submitPasswordDelete(submission) {
        if (submission.data && submission.data.password) {
            delete submission.data.password;
        }
    }
}
