import * as THREE from 'three';

type AssetSpec = { name: string; texture?: string };

class LoaderManager {
  private textures = new Map<string, THREE.Texture>();
  private loader = new THREE.TextureLoader();

  get(name: string) {
    return this.textures.get(name);
  }

  async load(list: AssetSpec[], renderer?: THREE.WebGLRenderer) {
    const anisotropy = renderer ? Math.min(8, renderer.capabilities.getMaxAnisotropy()) : 4;

    await Promise.all(
      list.map(async (item) => {
        if (!item.texture || this.textures.has(item.name)) return;

        const tex = await new Promise<THREE.Texture>((resolve, reject) => {
          this.loader.load(
            item.texture!,
            (t) => resolve(t),
            undefined,
            (e) => reject(e)
          );
        });

        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = anisotropy;
        tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
        tex.minFilter = THREE.LinearMipmapLinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = true;

        this.textures.set(item.name, tex);
      })
    );
  }
}

export default new LoaderManager();