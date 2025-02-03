import { Component, OnInit } from '@angular/core';
import { BarcodeScanner, BarcodeFormat, LensFacing } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
  standalone: false,
})
export class QrPage implements OnInit {
  public qrResultString: string = '';

  constructor() { }
  ngOnInit() {}

  async startScan() {
    const status = await BarcodeScanner.checkPermissions();
    if (status.camera !== 'granted') {
      await BarcodeScanner.requestPermissions();
    }

    const listener = await BarcodeScanner.addListener('barcodesScanned', async (result: any) => {
      this.qrResultString = result.barcode;
      await this.stopScan();
    });

    await BarcodeScanner.startScan();
  }

  async stopScan() {
    await BarcodeScanner.removeAllListeners();
    await BarcodeScanner.stopScan();
  }
}
