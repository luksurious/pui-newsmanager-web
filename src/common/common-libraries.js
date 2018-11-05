/**
 * INFO: this module just combines all external dependencies
 */
import 'angular-summernote/src/angular-summernote';
import 'ng-toast/dist/ngToast.min.css';
import 'ng-toast';

import './image-uploader';
import './image-base64-formatter';

angular.module('common-libraries', [
    'ngRoute',
    'ngResource',
    'ngSanitize',
    'ngMessages',
    'ngToast',
    'summernote', 
    'imageUploader',
    'imageBase64Formatter'
])
    .config(['ngToastProvider', function (ngToastProvider) {
        ngToastProvider.configure({
            timeout: 2000
        });
    }]);
