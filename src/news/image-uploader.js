let app = angular.module("imageUploader", []);

/**************************************************************************/
// Code to load the image files 
app.controller('UploadController', function ($scope, fileReader) {
	$scope.imageSrc = "";

	$scope.$on("fileProgress", function (e, progress) {
		$scope.progress = progress.loaded / progress.total;
	});
});

app.directive("ngFileSelect", function (fileReader, $timeout) {
	return {
		scope: {
			ngModel: '='
		},
		link: function ($scope, el) {
			function getFile(file) {
				fileReader.readAsDataUrl(file, $scope)
					.then(function (result) {
						$timeout(function () {
							$scope.ngModel.image_media_type = result.substring(5, result.indexOf(";base64"));
							$scope.ngModel.image_data = result.substring(result.indexOf(";base64,") + 8, result.length);
							
							//$scope.ngModel. = result;
						});
					});
			}

			el.bind("change", function (e) {
				let file = (e.srcElement || e.target).files[0];
				getFile(file);
			});
		}
	};
});

app.factory("fileReader", function ($q, $log) {
	let onLoad = function (reader, deferred, scope) {
		return function () {
			scope.$apply(function () {
				deferred.resolve(reader.result);
			});
		};
	};

	let onError = function (reader, deferred, scope) {
		return function () {
			scope.$apply(function () {
				deferred.reject(reader.result);
			});
		};
	};

	let onProgress = function (reader, scope) {
		return function (event) {
			scope.$broadcast("fileProgress", {
				total: event.total,
				loaded: event.loaded
			});
		};
	};

	let getReader = function (deferred, scope) {
		let reader = new FileReader();
		reader.onload = onLoad(reader, deferred, scope);
		reader.onerror = onError(reader, deferred, scope);
		reader.onprogress = onProgress(reader, scope);
		return reader;
	};

	let readAsDataURL = function (file, scope) {
		let deferred = $q.defer();

		let reader = getReader(deferred, scope);
		reader.readAsDataURL(file);

		return deferred.promise;
	};

	return {
		readAsDataUrl: readAsDataURL
	};
});


