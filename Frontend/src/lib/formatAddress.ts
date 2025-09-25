export function formatAddress (address:{
    line1 : string;
    line2? : string|null;
    city : string;
    state : string;
    pincode : string;
}) : string {
    const parts = [
        address.line1,
        address.line2,
        address.city,
        `${address.state}-${address.pincode}`
    ]
    return parts.filter(Boolean).join(', ');
}