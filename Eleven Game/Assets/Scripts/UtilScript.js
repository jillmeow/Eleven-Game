#pragma strict

// Returns true if game object is visible by the specified camera,
// otherwise returns false.
static function isVisible(renderer : Renderer, camera : Camera) {
	var planes : Plane[];
	planes = GeometryUtility.CalculateFrustumPlanes(camera);
	return GeometryUtility.TestPlanesAABB(planes, renderer.bounds);
}