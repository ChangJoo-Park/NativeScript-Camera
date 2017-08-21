const observableModule = require("data/observable");

function CameraPreviewViewModel(navigationContext) {
    const viewModel = observableModule.fromObject({
      image: navigationContext.image
    });

    return viewModel;
}

module.exports = CameraPreviewViewModel;
