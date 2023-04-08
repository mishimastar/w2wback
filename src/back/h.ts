function generateHive(height: number, width: number, char: string): string {
    let hive = '';
    const center = Math.floor(width / 2);
    const maxRadius = Math.floor(height / 2);

    for (let i = 0; i < height; i++) {
        let row = '';
        for (let j = 0; j < width; j++) {
            const distanceFromCenter = Math.abs(j - center);
            const distanceFromTop = maxRadius - i;
            const maxDistanceFromCenter = maxRadius - Math.abs(distanceFromTop);
            if (distanceFromCenter <= maxDistanceFromCenter) {
                row += char;
            } else {
                row += ' ';
            }
        }
        hive += row + '\n';
    }

    return hive;
}

console.log(generateHive(5, 5, 'A'));
