import { useState, ChangeEvent, FC } from 'react';
import CodeBlock from "@/app/components/CodeBlock/CodeBlock";
import styles from './index.module.scss'

const GetRequestInfo: FC = () => {
    const [address, setAddress] = useState<string>('http://127.0.0.1:8114/');
    const [result, setResult] = useState<string | null>(null);

    const requestInfo = async () => {
        try {
            if (!address) {
                setResult('Error: Address is empty');
                return;
            }

            const response = await fetch(address, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: 0,
                    jsonrpc: "2.0",
                    method: "local_node_info",
                    params: [],
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setResult(JSON.stringify({
                    "node_id": data?.result["node_id"]
                }, null, 2));
            } else {
                setResult(`Error: ${response.statusText}`);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setResult(`Error: ${error.message}`);
            } else {
                setResult(`An unknown error occurred`);
            }
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    return (
        <>
            <div className={styles.container}>
                <div>
                    <input
                        type="text"
                        value={address}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Enter address"
                    />
                </div>
                <div>
                    <button
                        onClick={requestInfo}
                        className={styles.button}
                    >
                        Get Node ID
                    </button>
                </div>
                {result && (
                    <CodeBlock>
                        <code className="language-json">
                            {result}
                        </code>
                    </CodeBlock>
                )}
            </div>
        </>
    );
};

export default GetRequestInfo;
