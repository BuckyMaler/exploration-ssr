export interface Photo {
  id: string;
  description: string;
  urls: {
    regular: string;
  };
  user: {
    name: string;
  };
}
