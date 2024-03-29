# Why a node's version can be undetectable ?
If your node is detected, but the version remains "Unknown" by the probe, please move on to the [Tweak your internet connection](#Why-we-can-not-detect-some-node-s-exact-version-8751fc2f256c4cf09ca3404840c21fc9) section for solution.

# **Understand Node Detection**

CKB Node Probe is built upon the **[P2P network probe project](https://github.com/cryptape/ckb-node-probe)**. While the probe discovers nodes connected to other public nodes, it‘s challenging to establish a working P2P connection with nodes that are behind an unexposed NAT or have reached the peer capacity due to default configuration.

When the probe successfully establishes a P2P connection with a node, the probe receives a **[Discovery Message](https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0012-node-discovery/0012-node-discovery.md#data-structures)** containing the version of the connected node as well as a list of nodes that it observes but does not know their versions. This is why we can detect some nodes but cannot determine their versions.

However, "Unknown Version Nodes" ≠ “Unreachable”. A node might be unreachable for two primary reasons: either there is no routing path from the probe network to the node's network during an attempt to set up a connection, or the node has already reached its maximum peer capacity.

While your node may currently be unreachable, it has the potential to become reachable in the future without any specific actions or interventions from your end. But, if you're interested in proactively increasing the visibility of your node, consider the following steps:

# **Tweak Your Internet Connection**

Here are a few pointers to help the probe connect to your node successfully.

## **Increase Max Peer Config**

Increase the **`max_peers`** and  **`max_outbound_peers`** fields in **`ckb.toml`** to accommodate more peers to your node.

## **Authorize CKB in Your Firewall**

Check your CKB configuration files to ensure that the port defined in your **[listen_address](https://github.com/nervosnetwork/ckb/blob/develop/resource/ckb.toml#LL62C5-L62C5)** is allowed by the firewall.

### Windows Users

Follow these **[instructions](https://learn.microsoft.com/en-us/sql/reporting-services/report-server/configure-a-firewall-for-report-server-access?view=sql-server-ver16#opening-ports-in-windows-firewall)**.

### Linux Users

Refer to the manual or wiki of the firewall application you're using. This **[tutorial](https://www.digitalocean.com/community/tutorials/opening-a-port-on-linux)** might help.

### MacOS Users

1. Open the **System Preferences** app and click on **Security & Privacy**.
2. Select the **Firewall** tab and click **Firewall Options**.
3. Click the plus sign **(+)** to add an application to the list of allowed apps.
4. Check the box next to your desired application to open its port on the firewall.

## Enhancing CKB Node functionality under NAT

Running a CKB node under a NAT can be complex. However, here are some configurations that might help solve the issue.

### Use UPnP or NAT-PMP

Recent router models often support UPnP (Universal Plug 'n Play) or NAT-PMP for automatic port forwarding. Check your router's documentation for instructions on enabling this feature, then [enable UPnP](https://github.com/nervosnetwork/ckb/blob/develop/resource/ckb.toml#LL91C11-L91C11) in CKB.

### Forward a Port Manually

If UPnP/NAT-PMP is unavailable or ineffective, manually forward the port.

### Forward Your Port in the Router

The process for forwarding a port in a router varies with each make and model. Check your router's label for its manufacturer and model number, and find the relevant instructions **[here](https://portforward.com/how-to-port-forward/)**.
