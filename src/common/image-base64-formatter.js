/**
 * INFO: a small filter to create the correct structure for base64 images
 */
angular.module('imageBase64Formatter', [])
    .filter('base64Src', function () {
        return function (base64Data, mediaType) {
            if (!base64Data) {
                return;
            }
            
            mediaType = mediaType || 'image/png';
            return `data:${mediaType};base64, ${base64Data}`;
        };
    });