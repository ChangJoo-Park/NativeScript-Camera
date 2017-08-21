const CameraPreviewViewModel = require("./camera-preview-view-model");

function onNavigatingTo(args) {
  var page = args.object;
  console.dir(page.navigationContext.image.src)
  page.bindingContext = new CameraPreviewViewModel(page.navigationContext)
}
exports.onNavigatingTo = onNavigatingTo;
