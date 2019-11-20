import Bee from 'bee-queue';
import redisConfig from '../config/redis';

import CancellationMail from '../app/jobs/CancellationMail';

const jobs = [CancellationMail];

/**
 * 1 - pegando todos os jobs da aplicação e armazenar dentro de this.queues
 * 2 - dentro do queues é armazenado a conexão com o redis e o handle
 */

class Queue {
    constructor() {
        this.queues = {};

        this.init();
    }

    init() {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new Bee(key, {
                    redis: redisConfig,
                }),
                handle,
            };
        });
    }

    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save();
    }

    processQueue() {
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key];

            bee.process(handle);
        });
    }
}

export default new Queue();
