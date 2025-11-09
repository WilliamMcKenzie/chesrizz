import { useState, useEffect, useRef, useCallback } from 'react';
import User from './user';

const useWebSocket = (url: string, user: User) => {
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);
    const ws = useRef<WebSocket | null>(null);

    // Function to initialize and handle the connection
    const connect = useCallback(() => {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            return; // Already connected
        }

        const newWs = new WebSocket(url);
        ws.current = newWs;
        console.log(`Attempting connection to ${url}`);

        newWs.onopen = () => {
            setIsConnected(true)
            console.log('Connected!')
            newWs.send(user?.email || '')
            newWs.send(user?.elo?.toString() || '')
        };

        newWs.onmessage = (event) => {
            // Logic for repeated data exchange
            setLastMessage(JSON.parse(event.data));
        };

        newWs.onclose = () => {
            setIsConnected(false);
            console.log('Connection closed. Attempting reconnect in 3s...');
            // Implement simple reconnection logic
            setTimeout(connect, 3000); 
        };

        newWs.onerror = (error) => {
            console.error('WebSocket Error:', error);
            newWs.close(); // Force close to trigger onclose/reconnection
        };

    }, [url, user]); // Dependency array ensures hook only re-runs if URL/User changes

    // Initial connection attempt and cleanup
    useEffect(() => {
        connect();
        
        // Cleanup: Closes the connection when the component unmounts
        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [connect]);

    // Function exposed to the component for sending data
    const sendMessage = (message: any) => {
        if (ws.current && isConnected) {
            ws.current.send(JSON.stringify(message));
        } else {
            console.warn('Cannot send message: WebSocket not connected.');
        }
    };

    return { isConnected, lastMessage, sendMessage };
};

export default useWebSocket;