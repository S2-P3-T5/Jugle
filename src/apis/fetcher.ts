import ky, { Input, KyInstance, Options } from "ky";

import { API_ROUTE } from "@/routes";

interface Fetcher extends Omit<KyInstance, "extend" | "create" | "stop"> {
  extend: (options: Options) => void;
}

class KyAdapter implements Fetcher {
  #fetcher: KyInstance;

  constructor(fetcher: KyInstance) {
    this.#fetcher = fetcher;
  }

  get(url: Input, options?: Options) {
    return this.#fetcher.get(url, options);
  }

  post(url: Input, options?: Options) {
    return this.#fetcher.post(url, options);
  }

  put(url: Input, options?: Options) {
    return this.#fetcher.put(url, options);
  }

  delete(url: Input, options?: Options) {
    return this.#fetcher.delete(url, options);
  }

  patch(url: Input, options?: Options) {
    return this.#fetcher.patch(url, options);
  }

  head(url: Input, options?: Options) {
    return this.#fetcher.head(url, options);
  }

  extend(options: Options) {
    this.#fetcher = this.#fetcher.extend(options);
    if (process.env.NODE_ENV === "development")
      // eslint-disable-next-line no-console
      console.log("ky options extended: ", options);
  }
}

export const fetcher = new KyAdapter(ky.create({ prefixUrl: API_ROUTE }));
