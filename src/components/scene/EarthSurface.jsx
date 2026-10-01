import { useMemo, useEffect } from "react";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { createEarthTexture, createCloudTexture } from "../../lib/earthMath.js";
import { getSceneSunDirection } from "../../lib/astronomy.js";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    vUv = uv;
    vNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Dot product in Earth-local coordinates: camera/follow rotations cannot move
// the terminator across geographic locations. Mesh UV alignment is -90° Y.
const fragmentShader = `
  uniform sampler2D dayMap;
  uniform sampler2D nightMap;
  uniform vec3 sunDirection;
  varying vec2 vUv;
  varying vec3 vNormal;
  void main() {
    float solar = dot(normalize(vNormal), sunDirection);
    float daylight = smoothstep(-0.09, 0.06, solar);
    vec3 day = texture2D(dayMap, vUv).rgb;
    vec3 night = texture2D(nightMap, vUv).rgb;
    float lights = smoothstep(0.06, 0.5, max(night.r, max(night.g, night.b)));
    vec3 darkEarth = day * 0.09 + night * lights * 1.7;
    vec3 litEarth = day * (0.5 + 0.75 * max(solar, 0.0));
    float twilight = exp(-pow(solar / 0.06, 2.0));
    gl_FragColor = vec4(mix(darkEarth, litEarth, daylight) + vec3(0.07, 0.028, 0.009) * twilight, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export function EarthSurface({ radius, isMobile, time, earthRef }) {
  const width = isMobile ? 1536 : 2304;
  const day = useMemo(() => createEarthTexture(width), [width]);
  const clouds = useMemo(() => createCloudTexture(width), [width]);
  const night = useTexture("/textures/earth-night-2012.jpg");
  night.colorSpace = THREE.SRGBColorSpace;
  const uniforms = useMemo(() => ({ dayMap: { value: day }, nightMap: { value: night }, sunDirection: { value: new THREE.Vector3() } }), [day, night]);
  const sceneSun = getSceneSunDirection(new Date(time));
  uniforms.sunDirection.value.set(sceneSun[2], sceneSun[1], -sceneSun[0]);
  const cloudUniforms = useMemo(() => ({ dayMap: { value: clouds }, sunDirection: uniforms.sunDirection }), [clouds, uniforms]);
  useEffect(() => () => { day.dispose(); clouds.dispose(); }, [day, clouds]);
  return <group rotation={[0, -Math.PI / 2, 0]}>
    <mesh ref={earthRef}>
      <sphereGeometry args={[radius, isMobile ? 64 : 96, isMobile ? 48 : 64]} />
      <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} uniforms={uniforms} />
    </mesh>
    <mesh>
      <sphereGeometry args={[radius + 0.015, 48, 48]} />
      <shaderMaterial transparent depthWrite={false} uniforms={cloudUniforms} vertexShader={vertexShader} fragmentShader={`
        uniform sampler2D dayMap;
        uniform vec3 sunDirection;
        varying vec2 vUv;
        varying vec3 vNormal;
        void main() {
          float light = smoothstep(-0.06, 0.2, dot(normalize(vNormal), sunDirection));
          gl_FragColor = vec4(vec3(0.75, 0.86, 1.0), texture2D(dayMap, vUv).a * light * 0.12);
          #include <colorspace_fragment>
        }
      `} />
    </mesh>
    <mesh scale={1.018}>
      <sphereGeometry args={[radius, 48, 48]} />
      <meshBasicMaterial color="#459ada" transparent opacity={0.14} side={THREE.BackSide} />
    </mesh>
  </group>;
}
