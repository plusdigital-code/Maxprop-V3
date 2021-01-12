import { Component } from '@angular/core';
import { FormioResourceEditComponent } from 'angular-formio/resource';
declare var $: any;
declare var Sortable: any;
var imageList = [];
@Component({
    selector: 'app-edit',
    templateUrl: './edit-component.html',
})
export class EditComponent extends FormioResourceEditComponent {
    ngDoCheck() {
        $('li.page-item').on("click", function (e) {
            var divElement = document.getElementById('sortOrder');
            var imageElement = document.getElementsByClassName('formio-component-images');
            if (divElement == null && imageElement.length > 0) {
                $('div.formio-component-images div').attr('id', 'sortOrder');;
                new Sortable(document.getElementById('sortOrder'), {
                    animation: 150,
                    ghostClass: 'blue-background-class'
                });
            }
        });
        var divElement = document.getElementById('sortOrder');
        var imageElement = document.getElementsByClassName('formio-component-images');
        if (divElement == null && imageElement.length > 0) {
            $('div.formio-component-images div').attr('id', 'sortOrder');;
            new Sortable(document.getElementById('sortOrder'), {
                animation: 150,
                ghostClass: 'blue-background-class'
            });
        }
        $('div.formio-component-images').on("drop", function (e) {
            imageList = [];
            $('div.formio-component-images img').each(function () {
                imageList.push($(this).prop('alt'));
            });
        })
        $('button.btn-wizard-nav-next').on("click", function () {
            var divElement = document.getElementById('sortOrder');
            var imageElement = document.getElementsByClassName('formio-component-images');
            if (divElement == null && imageElement.length > 0) {
                $('div.formio-component-images div').attr('id', 'sortOrder');;
                new Sortable(document.getElementById('sortOrder'), {
                    animation: 150,
                    ghostClass: 'blue-background-class'
                });
            }
            window.scrollTo(0, 0);
        });
        $('button.btn-wizard-nav-previous').on("click", function () {
            window.scrollTo(0, 0);
        });
    }

    reorderImage(submission) {
        let sortImagedata = [];
        if (imageList && imageList.length > 0) {
            imageList.map(x => {
                var image = this.service.resource.data.images.find(o => o.originalName === x);
                sortImagedata.push(image);
            })
        }
        if (sortImagedata && sortImagedata.length > 0) {
            submission.data.images = sortImagedata;
            imageList = [];
        }
    }
}
