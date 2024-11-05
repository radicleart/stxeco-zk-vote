# zk-vote

zk-vote is a sidecar to the stx.eco community voting application. The goal is to
provide users with anonymous voting rights.

## Routes

The main routes are;

- [zk page](https://stx.eco/zk-vote)

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Technology

zk-vote is built on zk-stark technology which provides the following benefits;

- **Transparency**: zk-STARKs are transparent and do not require a trusted setup, enhancing security and reducing the potential for “trapdoors.”
- **Scalability**: zk-STARKs are highly scalable, with proof generation that can handle larger datasets efficiently.
- **Quantum Resistance**: zk-STARKs are resistant to quantum attacks due to their reliance on hash functions rather than elliptic curve cryptography.
- **Auditability and Transparency**: zk-STARKs have transparent proof generation, making them highly auditable and appealing for public blockchain use.