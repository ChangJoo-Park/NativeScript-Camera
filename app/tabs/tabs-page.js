const TabsViewModel = require("./tabs-view-model");
const camera = require("nativescript-camera");
const imageModule = require("ui/image");
const frameModule = require("ui/frame");
const topmost = frameModule.topmost;

/* ***********************************************************
* Use the "onNavigatingTo" handler to initialize data for the whole tab
* navigation layout as a whole.
*************************************************************/
function onNavigatingTo(args) {
  /* ***********************************************************
    * The "onNavigatingTo" event handler lets you detect if the user navigated with a back button.
    * Skipping the re-initialization on back navigation means the user will see the
    * page in the same data state that he left it in before navigating.
    *************************************************************/
  if (args.isBackNavigation) {
    return;
  }
  camera.requestPermissions();
  const page = args.object;
  page.bindingContext = new TabsViewModel();
}

/* ***********************************************************
 * Get the current tab view title and set it as an ActionBar title.
 * Learn more about the onSelectedIndexChanged event here:
 * https://docs.nativescript.org/cookbook/ui/tab-view#using-selectedindexchanged-event-from-xml
 *************************************************************/
function onSelectedIndexChanged(args) {
  const tabView = args.object;
  const bindingContext = tabView.bindingContext;
  const selectedTabViewItem = tabView.items[args.newIndex];

  bindingContext.set("title", selectedTabViewItem.title);
}

function onCamera(args) {
  camera
    .takePicture()
    .then(function(imageAsset) {
      var image = new imageModule.Image();
      image.src = imageAsset;
      var navigationEntry = {
        moduleName: './camera-preview/CameraPreview',
        context: { image: image },
        animated: true
      };
      topmost().navigate(navigationEntry);
    })
    .catch(function(err) {
      console.log("Error -> " + err.message);
    });
}

exports.onSelectedIndexChanged = onSelectedIndexChanged;
exports.onNavigatingTo = onNavigatingTo;
exports.onCamera = onCamera;
