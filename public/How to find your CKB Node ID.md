# How to Find Your CKB Node ID

This guide will help you find your CKB Node ID when your **CKB node or Neuron is up and running**. You will need to open a new terminal window to interact with your node without disrupting its operation.

## Step 1: Retrieve your Node ID

In a new Terminal (on MacOS/Linux) or Command Prompt (on Windows) window, send [an RPC request](https://github.com/nervosnetwork/ckb/tree/develop/rpc#method-local_node_info) to your node to retrieve its ID. This ID uniquely identifies your node in the network.

- **For MacOS and Linux:**

    ```bash
    curl -X "POST" "http://localhost:8114/" \
         -H 'Content-Type: application/json' \
         -d $'{
      "id": 2,
      "jsonrpc": "2.0",
      "method": "local_node_info",
      "params": []
    }'
    ```

- **For Windows**

    ```cmd
    curl -X POST -H "Content-Type: application/json" -d "{\"id\": 2, \"jsonrpc\": \"2.0\", \"method\": \"local_node_info\", \"params\": []}" http://localhost:8114 | powershell -command "$json = $input | ConvertFrom-Json; $result = $json.result; $result | ConvertTo-Json; $result | ConvertTo-Json  | Set-Clipboard; $result"

    ```


> Note: If you have changed the default RPC address **`http://localhost:8114/`** in your CKB [node configuration](https://www.notion.so/How-to-Find-Your-CKB-Node-ID-5ce430154e184723928afd4e265f6a23?pvs=21), make sure to replace it in the commands above.
>

## ****Step 2: Interpret the Response****

After sending the request, the terminal will display a response containing detailed information about your CKB node.

The response should look something like this:

```json
{
    "jsonrpc": "2.0",
    "result": {
        "active": true,
        "addresses": [
            {
                "address": "/ip4/0.0.0.0/tcp/8115",
                "score": "0x1"
            }
        ],
        "connections": "0x8",
        "node_id": "QmdRWNKZ8EVJxhrDusbyYoYaGCQdStB4fSDotis7czUs",
        "protocols": [
          //...
        ],
        "version": "0.110.0 (0679b11 2023-05-16)"
    },
    "id": 2
}
```

In this response, the **`node_id`** field provides your Node ID. 
In this example, the Node ID is **`QmdRWNKZ8EVJxhrDusbyYoYaGCQdStB4fSDotis7czUs`**. 
You can either note down the Node ID or keep the entire output.

## Step 3: Email us your Node ID

Once you have your Node ID, **[EMAIL](mailto:ckb-node-probe@cryptape.com)** it to us at **ckb-node-probe@cryptape.com** along with any relevant details about your router setup 😉.

---

# **Extra: Check Your Node Configuration**

If you're unsure about your RPC address, follow the steps below to verify it:

## *For Neuron:*

Check your RPC address under Settings -> Network

## *For CKB mainnet node:*

### Step 1: Access your CKB Node directory

**Open a new Terminal (on MacOS/Linux) or Command Prompt (on Windows) window** and navigate to your CKB node directory. Below is an example; you'll need to **replace the path** after `cd` with your actual pathname:

```bash
cd Your Node Pathname
```

- **For MacOS:**
    
    ```bash
    cd /Users/[UserName]/Documents/ckb_v0.108.1_aarch64-apple-darwin
    ```
    
- **For Linux:**
    
    ```bash
    # Here we assume you download ckb from our Github's release page and untar-ed it directly
    # possible previous steps:
    # cd ~/Downloads && \
    # wget https://github.com/nervosnetwork/ckb/releases/download/v0.111.0-rc8/ckb_v0.111.0-rc8_x86_64-unknown-linux-gnu.tar.gz && \
    # tar -xvf ckb_v0.111.0-rc8_x86_64-unknown-linux-gnu.tar.gz
    cd ~/Downloads/ckb_v0.111.0-rc8_x86_64-unknown-linux-gnu
    ```
    
- **For Windows:**
    
    ```bash
    cd C:\ckb\ckb_v0.104.1_x86_64-pc-windows-msvc
    ```
    

### Step 2: **Locate Your `ckb.toml` Configuration File**

In your CKB node directory, there is a file called **`ckb.toml`** that stores the node configuration. Open it using the following command:

```bash
vi ckb.toml
```

### Step 3: Find the RPC Listening Address

Within the `ckb.toml` file, find the `listening_address` under the `[rpc]` section. This is the address your node uses to listen for RPC requests.

For example, if you see:

```toml
listen_address = "127.0.0.1:8114"
```

This means your node is listening for RPC requests at `http://localhost:8114/`. Make sure to use this address while retrieving your Node ID.
