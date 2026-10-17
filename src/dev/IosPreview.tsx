import IosDesktop from '../ios/IosDesktop'

// Development only (open /#ios-preview): the iOS screen on its own, without the 3D scene,
// so it can be built and tested quickly. Never included in the production build.
const IosPreview = () => (
  <div
    className="fixed inset-0"
    style={{ backgroundImage: "url('/images/wallpaper.webp')", backgroundSize: 'cover', backgroundPosition: 'center' }}
  >
    <IosDesktop onClose={() => undefined} />
  </div>
)

export default IosPreview
