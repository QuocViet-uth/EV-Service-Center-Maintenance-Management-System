package com.evservice.maintenance.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "payment.gateway")
public class PaymentGatewayProperties {
    private String vnpTmnCode;
    private String vnpHashSecret;
    private String vnpPayUrl;
    private String returnUrl;
    private String ipnUrl;
    private Integer expireMinutes = 15;

    public String getVnpTmnCode() { return vnpTmnCode; }
    public void setVnpTmnCode(String vnpTmnCode) { this.vnpTmnCode = vnpTmnCode; }
    public String getVnpHashSecret() { return vnpHashSecret; }
    public void setVnpHashSecret(String vnpHashSecret) { this.vnpHashSecret = vnpHashSecret; }
    public String getVnpPayUrl() { return vnpPayUrl; }
    public void setVnpPayUrl(String vnpPayUrl) { this.vnpPayUrl = vnpPayUrl; }
    public String getReturnUrl() { return returnUrl; }
    public void setReturnUrl(String returnUrl) { this.returnUrl = returnUrl; }
    public String getIpnUrl() { return ipnUrl; }
    public void setIpnUrl(String ipnUrl) { this.ipnUrl = ipnUrl; }
    public Integer getExpireMinutes() { return expireMinutes; }
    public void setExpireMinutes(Integer expireMinutes) { this.expireMinutes = expireMinutes; }
}


