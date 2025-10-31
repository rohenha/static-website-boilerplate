// Types globaux du projet
declare global {
  interface BlogPost {
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    content: string;
  }

  // Types Eleventy
  namespace Eleventy {
    interface PaginationData<T = any> {
      items: Array<{
        url: string;
        data: T;
        [key: string]: any;
      }>;
      pageNumber: number;
      hrefs: string[];
      href: {
        next: string | null;
        previous: string | null;
        first: string;
        last: string;
      };
      pages: Array<{
        url: string;
        data: any;
      }>;
      page: {
        next: any;
        previous: any;
        first: any;
        last: any;
      };
      size: number;
    }

    interface EleventyData {
      pagination?: PaginationData;
      [key: string]: any;
    }
  }
}

export {};
