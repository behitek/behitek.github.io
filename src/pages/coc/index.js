import Layout from '@theme/Layout';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function ClanProfile() {
    const [warData, setWarData] = useState(null);
    const [clanData, setClanData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const clanLinks = {
        clanLink: "https://link.clashofclans.com/?action=OpenClanProfile&tag=2g9yrcrv2",
        zaloLink: "https://zalo.me/g/wblyoe887",
    };

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
                const data = await response.json();
                setClanData(data);
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
                        <h1>{clanData.name || "N/A"}</h1>
                        <div className={styles.tag}>
                            <a
                                href={clanLinks.clanLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="View clan in game"
                            >
                                {clanData.tag || "N/A"}
                            </a>
                        </div>
                        <div className={styles.leagueBadge}>
                            <img
                                src={`https://www.clash.ninja/images/warleague/${clanData.warLeague?.id}.png`}
                                alt="League"
                            />
                            {clanData.warLeague?.name || "N/A"}
                        </div>
                        {/* Description */}
                        <div className={styles.description}>
                            {clanData.description}
                        </div>
                        {/* Action Buttons */}
                        <div className="flex justify-center gap-4 mt-8">
                            <button
                                className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors cursor-pointer flex items-center gap-2"
                                onClick={() => window.open(clanLinks.zaloLink, '_blank')} title="Join our Zalo chat"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Icon_of_Zalo.svg" alt="Zalo" className="w-6 h-6" />
                                Tham gia nhóm Zalo
                            </button>
                            <button
                                className="bg-blue-500 text-white px-3 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors cursor-pointer flex items-center gap-2"
                                onClick={() => window.open(clanLinks.clanLink, '_blank')} title="View clan in game"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/vi/5/59/Clash_of_Clans_Logo.png" alt="Clash of Clans" className="w-6" />
                                Tham gia Clan
                            </button>
                        </div>
                        <hr />
                    </div>

                    <div className={styles.content}>
                        {/* Clan Badge and Labels */}
                        <div className={styles.badgeSection}>
                            <img
                                src={clanData.badgeUrls?.medium}
                                alt="Clan Badge"
                                className={styles.mainBadge}
                            />
                            <div className={styles.clanLabels}>
                                {clanData.labels?.map((label) => (
                                    <img
                                        key={label.id}
                                        src={label.iconUrls.medium}
                                        alt={label.name}
                                        title={label.name}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Stats Section */}
                        <div className={styles.statsSection}>
                            <div className={styles.statsList}>
                                {Object.entries({
                                    'Total Points:': `${clanData.clanPoints || 0} | ${clanData.clanVersusPoints || 0}`,
                                    'Wars Won:': `${clanData.warWins || 0} (${((clanData.warWins / (clanData.warWins + clanData.warLosses + (clanData.warTies || 0))) * 100).toFixed(1)}%)`,
                                    'War Win Streak:': clanData.warWinStreak || 0,
                                    'War Results:': (
                                        <span>
                                            <span className={styles.textSuccess}>{clanData.warWins || 0}</span>
                                            {' | '}
                                            <span className={styles.textGray}>{clanData.warTies || 0}</span>
                                            {' | '}
                                            <span className={styles.textDanger}>{clanData.warLosses || 0}</span>
                                        </span>
                                    ),
                                    'Members:': `${clanData.members || 0} / 50`,
                                    'Status:': clanData.type ? clanData.type.charAt(0).toUpperCase() + clanData.type.slice(1) : "N/A",
                                    'War Frequency:': clanData.warFrequency ? clanData.warFrequency.charAt(0).toUpperCase() + clanData.warFrequency.slice(1) : "N/A",
                                    'Location:': (
                                        <span className={styles.location}>
                                            {clanData.location?.countryCode && (
                                                <img
                                                    src={`https://www.clash.ninja/images/flags/${clanData.location.countryCode}.svg`}
                                                    alt="Flag"
                                                />
                                            )}
                                            {clanData.location?.name || "N/A"}
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
                                        <span title='Attack used / No. of attacks'>⚔ {warData.clan.attacks}/{warData.teamSize * warData.attacksPerMember}</span>
                                        <div className={styles.progressBar} title={`War progress: ${((warData.clan.stars / (warData.teamSize * 3)) * 100).toFixed(1)}%`}>
                                            <div
                                                className={styles.progressFill}
                                                style={{ width: `${(warData.clan.stars / (warData.teamSize * 3)) * 100}%` }}
                                            />
                                        </div>
                                        <span>⭐ {warData.clan.stars}/{warData.teamSize * 3}</span>
                                    </div>
                                    <div className={styles.townHallDistribution}>
                                        {Object.entries(
                                            warData.clan.members?.reduce((acc, member) => {
                                                const th = member.townhallLevel;
                                                acc[th] = (acc[th] || 0) + 1;
                                                return acc;
                                            }, {}) || {}
                                        ).sort((a, b) => b[0] - a[0]).map(([th, count]) => (
                                            <div key={th} className={styles.townHall} title={`TH${th}`}>
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
                                        <span title='Attack used / No. of attacks'>⚔ {warData.opponent.attacks}/{warData.teamSize * warData.attacksPerMember}</span>
                                        <div className={styles.progressBar} title={`War progress: ${((warData.opponent.stars / (warData.teamSize * 3)) * 100).toFixed(1)}%`}>
                                            <div
                                                className={styles.progressFill}
                                                style={{ width: `${(warData.opponent.stars / (warData.teamSize * 3)) * 100}%` }}
                                            />
                                        </div>
                                        <span>⭐ {warData.opponent.stars}/{warData.teamSize * 3}</span>
                                    </div>
                                    <div className={styles.townHallDistribution}>
                                        {Object.entries(warData.opponent.members?.reduce((acc, member) => {
                                            const th = member.townhallLevel;
                                            acc[th] = (acc[th] || 0) + 1;
                                            return acc;
                                        }, {}) || {}
                                        ).sort((a, b) => b[0] - a[0]).map(([th, count]) => (
                                            <div key={th} className={styles.townHall} title={`TH${th}`}>
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