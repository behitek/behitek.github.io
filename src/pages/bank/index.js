// index.js
import Layout from '@theme/Layout';
import React from 'react';
import styles from './styles.module.css';

export default function QRCode() {
    return (
        <Layout
            title="Payment QR Code"
            description="Scan QR code to transfer money">
            <main className={styles.container}>
                <div className={styles.qrSection}>
                    <h1 className={styles.title}>Scan to Pay</h1>
                    <div className={styles.qrWrapper}>
                        <img
                            src="/img/bank.jpeg"
                            alt="Payment QR Code"
                            className={styles.qrImage}
                        />
                    </div>
                </div>
            </main>
        </Layout>
    );
}