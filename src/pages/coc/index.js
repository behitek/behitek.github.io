import Layout from '@theme/Layout';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function ClanProfile() {
    const [warData, setWarData] = useState(null);
    const [clanData, setClanData] = useState({
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
        description: "🇻🇳 Welcome to \"NEVER DIE\" ⭐  \n🎈 Nhóm chat: behitek(.)com/coc\n🗓 Thích đánh war ⚔ Mê leo cúp 🏆  \n📌 Đăng ký war trong tin nhắn ghim!</div >",
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
    });

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWarData = async () => {
            try {
                const response = await fetch('https://coc-apis.behitek.com/clan/%232G9YRCRV2/currentwar');
                const warApiData = await response.json();
                setWarData(warApiData);
            } catch (err) {
                console.error('Error fetching war data:', err);
            }
        };

        fetchWarData();
    }, []);

    useEffect(() => {
        const fetchClanData = async () => {
            try {
                const response = await fetch('https://coc-apis.behitek.com/clan/%232G9YRCRV2');
                const apiData = await response.json();

                // Calculate win rate
                const totalWars = apiData.warWins + apiData.warLosses + (apiData.warTies || 0);
                const winRate = totalWars > 0 ? ((apiData.warWins / totalWars) * 100).toFixed(1) : "0";

                // Update clan data with API values, keeping defaults for missing data
                setClanData(prevData => ({
                    ...prevData,
                    name: apiData.name || prevData.name,
                    tag: apiData.tag || prevData.tag,
                    league: apiData.warLeague?.name || prevData.league,
                    totalPoints: `${apiData.clanPoints || 0} | ${apiData.clanVersusPoints || 0}`,
                    warsWon: apiData.warWins?.toString() || prevData.warsWon,
                    winRate: `${winRate}%`,
                    warWinStreak: apiData.warWinStreak?.toString() || prevData.warWinStreak,
                    warResults: {
                        wins: apiData.warWins || prevData.warResults.wins,
                        draws: apiData.warTies || prevData.warResults.draws,
                        losses: apiData.warLosses || prevData.warResults.losses
                    },
                    members: `${apiData.members || 0} / 50`,
                    status: (apiData.type?.charAt(0).toUpperCase() + apiData.type?.slice(1)) || prevData.status,
                    warFrequency: apiData.warFrequency || prevData.warFrequency,
                    location: apiData.location?.name || prevData.location,
                    images: {
                        ...prevData.images,
                        clanBadge: apiData.badgeUrls?.medium || prevData.images.clanBadge,
                        league: apiData.warLeague?.iconUrls?.medium || prevData.images.league,
                        flag: apiData.location?.countryCode ?
                            `https://www.clash.ninja/images/flags/${apiData.location.countryCode}.svg` :
                            prevData.images.flag
                    },
                    description: apiData.description || prevData.description,
                }));
                setIsLoading(false);
            } catch (err) {
                setError(err.message);
                setIsLoading(false);
            }
        };

        fetchClanData();
    }, []);

    const clanPerks = {
        donationWaitTime: "10 min",
        donationLimits: "50 | 3 | 2",
        donationLevelBoost: "+2",
        treasuryCapacity: "+50%",
        warLoot: "+25%"
    };

    if (isLoading) {
        return (
            <Layout title="Loading Clan Profile">
                <div className={styles.wrapper}>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-xl">Loading clan data...</div>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error) {
        return (
            <Layout title="Error Loading Clan Profile">
                <div className={styles.wrapper}>
                    <div className="flex justify-center items-center h-64">
                        <div className="text-xl text-red-600">Error loading clan data: {error}</div>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Clan Profile">
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    {/* Rest of your JSX remains the same */}
                    <div className={styles.header}>
                        <h1>{clanData.name}</h1>
                        <h2>
                            <a
                                href={clanData.clanLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View clan in game"
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
                                onClick={() => window.open(clanData.zaloLink, '_blank')} title="Join our Zalo chat"
                            >
                                Tham gia nhóm Zalo
                            </button>
                            <button
                                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors cursor-pointer"
                                onClick={() => window.open(clanData.clanLink, '_blank')} title="View clan in game"
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
                                    'War Frequency:': clanData.warFrequency.charAt(0).toUpperCase() + clanData.warFrequency.slice(1),
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

                    {/* Current War Section */}
                    {warData && (
                        <div className={styles.warSection}>
                            <h3>Current War</h3>
                            <div className={styles.warContent}>
                                <div className={styles.warTeam}>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <img
                                            src={warData.clan.badgeUrls?.medium}
                                            alt="Clan Badge"
                                            className="w-8 h-8"
                                        />
                                        <h4 className="m-0">{warData.clan.name}</h4>
                                    </div>
                                    <div className={styles.warProgress}>
                                        <span>{warData.clan.attacks}/{warData.teamSize * warData.attacksPerMember}</span>
                                        <div className={styles.progressBar}>
                                            <div
                                                className={styles.progressFill}
                                                style={{ width: `${(warData.clan.stars / (warData.teamSize * 3)) * 100}%` }}
                                            />
                                        </div>
                                        <span>{((warData.clan.stars / (warData.teamSize * 3)) * 100).toFixed(2)}%</span>
                                    </div>
                                    <div className={styles.townHallDistribution}>
                                        {Object.entries(
                                            warData.clan.members?.reduce((acc, member) => {
                                                const th = member.townhallLevel;
                                                acc[th] = (acc[th] || 0) + 1;
                                                return acc;
                                            }, {}) || {}
                                        ).sort((a, b) => b[0] - a[0]).map(([th, count]) => (
                                            <div key={th} className={styles.townHall}>
                                                <img src={`https://www.clash.ninja/images/entities/1_${th}.png`} alt={`TH${th}`} />
                                                <span>{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.warInfo}>
                                    <div className={styles.warStatus}>
                                        <span>vs</span>
                                        <p>{warData.state === 'preparation' ? 'Preparation Day' : 'Battle Day'}</p>
                                        <p><WarTimer warData={warData} /></p>
                                        <p>{warData.teamSize} vs {warData.teamSize}</p>
                                    </div>
                                    <button className={styles.warDetailsBtn}>War Details</button>
                                </div>

                                <div className={styles.warTeam}>
                                    <div className="flex items-center justify-center gap-2 mb-4">
                                        <img
                                            src={warData.opponent.badgeUrls?.medium}
                                            alt="Opponent Badge"
                                            className="w-8 h-8"
                                        />
                                        <h4 className="m-0">{warData.opponent.name}</h4>
                                    </div>
                                    <div className={styles.warProgress}>
                                        <span>{warData.opponent.attacks}/{warData.teamSize * warData.attacksPerMember}</span>
                                        <div className={styles.progressBar}>
                                            <div
                                                className={styles.progressFill}
                                                style={{ width: `${(warData.opponent.stars / (warData.teamSize * 3)) * 100}%` }}
                                            />
                                        </div>
                                        <span>{((warData.opponent.stars / (warData.teamSize * 3)) * 100).toFixed(2)}%</span>
                                    </div>
                                    <div className={styles.townHallDistribution}>
                                        {Object.entries(warData.opponent.members?.reduce((acc, member) => {
                                            const th = member.townhallLevel;
                                            acc[th] = (acc[th] || 0) + 1;
                                            return acc;
                                        }, {}) || {}
                                        ).sort((a, b) => b[0] - a[0]).map(([th, count]) => (
                                            <div key={th} className={styles.townHall}>
                                                <img src={`https://www.clash.ninja/images/entities/1_${th}.png`} alt={`TH${th}`} />
                                                <span>{count}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

function WarTimer({ warData }) {
    const [timeRemaining, setTimeRemaining] = useState('N/A');

    useEffect(() => {
        const updateTime = () => {
            if (!warData.startTime && !warData.endTime) {
                setTimeRemaining('N/A');
                return;
            }

            const now = new Date();
            let targetTime;

            if (warData.state === 'preparation') {
                targetTime = new Date(warData.startTime.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6'));
            } else {
                targetTime = new Date(warData.endTime.replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, '$1-$2-$3T$4:$5:$6'));
            }

            const diffMs = targetTime.getTime() - now.getTime();

            if (diffMs > 0) {
                const hours = Math.floor(diffMs / (1000 * 60 * 60));
                const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                setTimeRemaining(`${hours}h ${minutes}m`);
            } else {
                setTimeRemaining('N/A');
            }
        };

        // Initial update
        updateTime();

        // Set up interval to update every 20 seconds
        const interval = setInterval(updateTime, 20000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, [warData.startTime, warData.endTime, warData.state]);

    return timeRemaining;
}