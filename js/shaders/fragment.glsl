varying float vNoise;
varying vec2 vUv;
uniform sampler2D saurabhTexture;

void main(){
    vec3 color1 = vec3(1.,0.,0.);
    vec3 color2 = vec3(1.,1.,1.);
    vec3 finalColor = mix(color1,color2,0.5*(vNoise+1.));

    vec4 saurabhView = texture2D(saurabhTexture,vUv);

    gl_FragColor = vec4(finalColor,1.);
    gl_FragColor = vec4(vUv,1.,1.);
    gl_FragColor = saurabhView;
}