function drawMap(ctx, imageList, playerlist, layer1, tileSize, rowTileCount, colTileCount) {
    for (let y = 0; y < rowTileCount; y++) {
        for (let x = 0; x < colTileCount; x++) {
            const tileId = layer1[y][x];
            const tileX = (tileId % 9) * tileSize;
            const tileY = Math.floor(tileId / 9) * tileSize;

            ctx.drawImage(
                imageList[0],
                tileX,
                tileY,
                tileSize,
                tileSize,
                x * tileSize - playerlist[0].playerCameraX,
                y * tileSize - playerlist[0].playerCameraY,
                40,
                40
            );
        }
    }
}

function getTile(x, y, tileSize, mapData) {
    const tileX = Math.trunc(x / tileSize) || 0;
    const tileY = Math.trunc(y / tileSize) || 0;
    return mapData[tileY][tileX];
}

