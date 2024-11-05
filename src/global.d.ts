interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (...args: any[]) => Promise<any>;
      // Add other methods/properties as needed
    };
  }
  