import { Client, Device, Plug } from 'tplink-smarthome-api';
import { AnyDevice } from 'tplink-smarthome-api/lib/client';

export class SmartOutlets {
    private client : Client = new Client();
    private lights : AnyDevice | undefined;

    async logSysInfo() {
        console.log(await this.lights?.getSysInfo());
    }

    async setUp() {
        this.lights = await this.client.getDevice({ host: process.env.OVERHEAD_LIGHTS_IP});
    }

    turnOn() {
        this.lights?.setPowerState(true);
    }

    turnOff() {
        this.lights?.setPowerState(false);
    }

}