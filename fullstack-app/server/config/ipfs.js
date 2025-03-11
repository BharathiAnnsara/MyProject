import { create } from 'ipfs-http-client';

// Connect to a public IPFS node or your local node
const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

export default ipfs;
