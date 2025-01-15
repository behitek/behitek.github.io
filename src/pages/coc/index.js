import Layout from '@theme/Layout';
import React from 'react';
import styles from './styles.module.css';

export default function ClanProfile() {
    const clanData = {
        name: "NEVER DIE",
        tag: "#2G9YRCRV2",
        league: "Crystal League I",
        totalPoints: "43,234 | 0",
        warsWon: "123",
        winRate: "67%",
        warWinStreak: "60",
        warResults: {
            wins: 123,
            draws: 11,
            losses: 50
        },
        members: "43 / 50",
        status: "Open",
        warFrequency: "Always",
        location: "Vietnam",
        description: (
            <div className={styles.description}>
                <p>🇻🇳 Welcome to <b>"NEVER DIE"</b> ⭐</p>
                <p>Thành lập: 07/01/2023</p>
                <p>Thích đánh war ⚔ Mê leo cúp 🏆</p>
                <p>Đăng ký war trong tin nhắn ghim!</p>
            </div>
        ),
        images: {
            clanBadge: "https://api-assets.clashofclans.com/badges/512/ctsKW63Z7yj215eoSjmU7oF364m-nwopLQYDoVz2yNw.png",
            labels: {
                war: "https://api-assets.clashofclans.com/labels/128/lXaIuoTlfoNOY5fKcQGeT57apz1KFWkN9-raxqIlMbE.png",
                trophy: "https://api-assets.clashofclans.com/labels/128/hNtigjuwJjs6PWhVtVt5HvJgAp4ZOMO8e2nyjHX29sA.png"
            },
            league: "https://www.clash.ninja/images/warleague/48000012.png",
            flag: "https://www.clash.ninja/images/flags/VN.svg"
        },
        clanLink: "https://link.clashofclans.com/?action=OpenClanProfile&tag=2g9yrcrv2",
        zaloLink: "https://zalo.me/g/wblyoe887",
    };

    const clanPerks = {
        donationWaitTime: "10 min",
        donationLimits: "50 | 3 | 2",
        donationLevelBoost: "+2",
        treasuryCapacity: "+50%",
        warLoot: "+25%"
    };

    return (
        <Layout title="Clan Profile">
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Clan Header */}
                    <div className={styles.header}>
                        <h1>"{clanData.name}"</h1>
                        <h2>
                            <a
                                href={clanData.clanLink}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {clanData.tag}
                            </a>
                        </h2>
                        <div className={styles.leagueBadge}>
                            <img
                                src={clanData.images.league}
                                alt="League"
                            />
                            {clanData.league}
                        </div>
                        {/* Description */}
                        <div className={styles.description}>
                            {clanData.description}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors cursor-pointer"
                                onClick={() => window.open(clanData.zaloLink, '_blank')}
                            >
                                Tham gia nhóm Zalo
                            </button>
                            <button
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
                                onClick={() => window.open(clanData.clanLink, '_blank')}
                            >
                                Tham gia Clan
                            </button>
                        </div>
                        <hr />
                    </div>

                    <div className={styles.content}>
                        {/* Clan Badge and Labels */}
                        <div className={styles.badgeSection}>
                            <img
                                src={clanData.images.clanBadge}
                                alt="Clan Badge"
                                className={styles.mainBadge}
                            />
                            <div className={styles.clanLabels}>
                                <img
                                    src={clanData.images.labels.war}
                                    alt="War"
                                    title="Clan Wars"
                                />
                                <img
                                    src={clanData.images.labels.trophy}
                                    alt="Trophy"
                                    title="Trophy Pushing"
                                />
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className={styles.statsSection}>
                            <div className={styles.statsList}>
                                {Object.entries({
                                    'Total Points:': clanData.totalPoints,
                                    'Wars Won:': `${clanData.warsWon} (${clanData.winRate})`,
                                    'War Win Streak:': clanData.warWinStreak,
                                    'War Results:': (
                                        <span>
                                            <span className={styles.textSuccess}>{clanData.warResults.wins}</span>
                                            {' | '}
                                            <span className={styles.textGray}>{clanData.warResults.draws}</span>
                                            {' | '}
                                            <span className={styles.textDanger}>{clanData.warResults.losses}</span>
                                        </span>
                                    ),
                                    'Members:': clanData.members,
                                    'Status:': clanData.status,
                                    'War Frequency:': clanData.warFrequency,
                                    'Location:': (
                                        <span className={styles.location}>
                                            <img src={clanData.images.flag} alt="Flag" />
                                            {clanData.location}
                                        </span>
                                    ),
                                }).map(([label, value]) => (
                                    <div key={label} className={styles.statRow}>
                                        <span>{label}</span>
                                        <strong>{value}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Clan Perks */}
                        <div className={styles.perksSection}>
                            <h3>Clan Perks</h3>
                            <div className={styles.perksList}>
                                {Object.entries({
                                    'Donation Wait Time:': clanPerks.donationWaitTime,
                                    'Donation Limit (Troops|Spells|Sieges):': clanPerks.donationLimits,
                                    'Donation Level Boost:': clanPerks.donationLevelBoost,
                                    'Treasury Capacity:': clanPerks.treasuryCapacity,
                                    'War Loot:': clanPerks.warLoot,
                                }).map(([label, value]) => (
                                    <div key={label} className={styles.statRow}>
                                        <span>{label}</span>
                                        <strong>{value}</strong>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}