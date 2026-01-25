export const NEXUS_MODE = import.meta.env.NEXUS_MODE || 'internal';

export const isInternalMode = () => NEXUS_MODE === 'internal';
export const isLicensedMode = () => NEXUS_MODE === 'licensed';
