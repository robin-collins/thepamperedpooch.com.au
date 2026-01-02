import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BusinessInfo, Service } from './types';
import { BUSINESS_INFO as FALLBACK_INFO, SERVICES as FALLBACK_SERVICES } from './constants';

interface ConfigContextType {
    businessInfo: BusinessInfo;
    services: Service[];
    loading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export const ConfigProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [businessInfo, setBusinessInfo] = useState<BusinessInfo>(FALLBACK_INFO);
    const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const response = await fetch('/api/config');
                if (response.ok) {
                    const data = await response.json();
                    if (data.businessInfo && Object.keys(data.businessInfo).length > 0) {
                        setBusinessInfo(data.businessInfo);
                    }
                    if (data.services && Array.isArray(data.services) && data.services.length > 0) {
                        setServices(data.services);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch config, using fallbacks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchConfig();
    }, []);

    return (
        <ConfigContext.Provider value={{ businessInfo, services, loading }}>
            {children}
        </ConfigContext.Provider>
    );
};

export const useConfig = () => {
    const context = useContext(ConfigContext);
    if (context === undefined) {
        throw new Error('useConfig must be used within a ConfigProvider');
    }
    return context;
};
