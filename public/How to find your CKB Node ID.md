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

    ```powershell
    $uri = "http://localhost:8114/"
    $headers = @{"Content-Type" = "application/json"}
    $body = @{
        "id" = 2
        "jsonrpc" = "2.0"
        "method" = "local_node_info"
        "params" = @()
    } | ConvertTo-Json
    
    $response = Invoke-RestMethod -Method Post -Uri $uri -Headers $headers -Body $body
    $response
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
        "node_id": "**QmdRWNKZ8EVJxhrDusbyYoYaGCQdStB4fSDotis7czUs**",
        "protocols": [
          //...
        ],
        "version": "0.110.0 (0679b11 2023-05-16)"
    },
    "id": 2
}
```

In this response, the **`node_id`** field provides your Node ID. In this example, the Node ID is **`QmdRWNKZ8EVJxhrDusbyYoYaGCQdStB4fSDotis7czUs`**. You can either just note down this Node ID or keep the entire output.

## Step 3: Email us your Node ID

Once you have your Node ID, **[EMAIL](mailto:ckb-node-probe@cryptape.com)** it to us ************************at **ckb-node-probe@cryptape.com** along with any relevant details about your router setup 😉.

---

# **Extra: Check Your Node Configuration**