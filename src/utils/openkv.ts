export const readValue = async (key: string, path: string) => {
  try {
    const kv = await Deno.openKv(path);
    const value = await kv.get([key]);
    kv.close();
    return value.value;
  } catch (_) {
    throw new Error("无法读取KV的值");
  }
};

export const writeValue = async (key: string, value: string, path: string) => {
  try {
    const kv = await Deno.openKv(path);
    await kv.set([key], value);
    kv.close();
  } catch (_) {
    throw new Error("无法写入KV的值");
  }
};
