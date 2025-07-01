# CKB-node-probe-frontend

This is a front-end project aimed at visualizing the changes in the CKB network across different regions and versions.

![image](https://github.com/cryptape/ckb-node-probe-frontend/assets/11926244/44efd5fc-b936-4894-a011-ac2909c3b1dd)



## Purpose

The purpose of CKB Node Probe is to provide a data visualization tool for observing the CKB network.  It allows users to track and analyze the changes in the CKB network based on geographical regions and software versions.

## Getting Started

- Clone the repository.
```bash
git clone git@github.com:cryptape/ckb-node-probe-frontend.git
```

- Install the necessary dependencies

```bash
pnpm install
```

- Run the project

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
> The default port is 3000, but it depends on the availability of ports on your system.

## Backends

The backend API is provided by project [Marci](https://github.com/cryptape/Marci), and data source are from [CKB Node Probe](https://github.com/cryptape/ckb-node-probe). You'll need setup and run these two project before running this project. The project [CKB Node Probe](https://github.com/cryptape/ckb-node-probe) contains a docker-compose deployment file for easy deployment, you can just use that to deploy both the probe and the backend.

## Technologies Used
- React: JavaScript library for building user interfaces.
- ECharts: Powerful charting and visualization library.
- TypeScript: Typed superset of JavaScript for enhanced development.
- React framework for server-side rendering and static site generation.

## License
This project is licensed under the MIT License.
