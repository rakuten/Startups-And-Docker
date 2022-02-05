- ## [#](https://awesome-prometheus-alerts.grep.to/rules#prometheus-self-monitoring-1) 1.1. Prometheus self-monitoring (25 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-1) 1.1.1. Prometheus job missing

    A Prometheus job has disappeared[copy]

    ```yaml
      - alert: PrometheusJobMissing
        expr: absent(up{job="prometheus"})
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Prometheus job missing (instance {{ $labels.instance }})
          description: "A Prometheus job has disappeared\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-2) 1.1.2. Prometheus target missing

    A Prometheus target has disappeared. An exporter might be crashed.[copy]

    ```yaml
      - alert: PrometheusTargetMissing
        expr: up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus target missing (instance {{ $labels.instance }})
          description: "A Prometheus target has disappeared. An exporter might be crashed.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-3) 1.1.3. Prometheus all targets missing

    A Prometheus job does not have living target anymore.[copy]

    ```yaml
      - alert: PrometheusAllTargetsMissing
        expr: count by (job) (up) == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus all targets missing (instance {{ $labels.instance }})
          description: "A Prometheus job does not have living target anymore.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-4) 1.1.4. Prometheus configuration reload failure

    Prometheus configuration reload error[copy]

    ```yaml
      - alert: PrometheusConfigurationReloadFailure
        expr: prometheus_config_last_reload_successful != 1
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Prometheus configuration reload failure (instance {{ $labels.instance }})
          description: "Prometheus configuration reload error\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-5) 1.1.5. Prometheus too many restarts

    Prometheus has restarted more than twice in the last 15 minutes. It might be crashlooping.[copy]

    ```yaml
      - alert: PrometheusTooManyRestarts
        expr: changes(process_start_time_seconds{job=~"prometheus|pushgateway|alertmanager"}[15m]) > 2
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Prometheus too many restarts (instance {{ $labels.instance }})
          description: "Prometheus has restarted more than twice in the last 15 minutes. It might be crashlooping.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-6) 1.1.6. Prometheus AlertManager configuration reload failure

    AlertManager configuration reload error[copy]

    ```yaml
      - alert: PrometheusAlertmanagerConfigurationReloadFailure
        expr: alertmanager_config_last_reload_successful != 1
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Prometheus AlertManager configuration reload failure (instance {{ $labels.instance }})
          description: "AlertManager configuration reload error\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-7) 1.1.7. Prometheus AlertManager config not synced

    Configurations of AlertManager cluster instances are out of sync[copy]

    ```yaml
      - alert: PrometheusAlertmanagerConfigNotSynced
        expr: count(count_values("config_hash", alertmanager_config_hash)) > 1
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Prometheus AlertManager config not synced (instance {{ $labels.instance }})
          description: "Configurations of AlertManager cluster instances are out of sync\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-8) 1.1.8. Prometheus AlertManager E2E dead man switch

    Prometheus DeadManSwitch is an always-firing alert. It's used as an end-to-end test of Prometheus through the Alertmanager.[copy]

    ```yaml
      - alert: PrometheusAlertmanagerE2eDeadManSwitch
        expr: vector(1)
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus AlertManager E2E dead man switch (instance {{ $labels.instance }})
          description: "Prometheus DeadManSwitch is an always-firing alert. It's used as an end-to-end test of Prometheus through the Alertmanager.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-9) 1.1.9. Prometheus not connected to alertmanager

    Prometheus cannot connect the alertmanager[copy]

    ```yaml
      - alert: PrometheusNotConnectedToAlertmanager
        expr: prometheus_notifications_alertmanagers_discovered < 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus not connected to alertmanager (instance {{ $labels.instance }})
          description: "Prometheus cannot connect the alertmanager\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-10) 1.1.10. Prometheus rule evaluation failures

    Prometheus encountered {{ $value }} rule evaluation failures, leading to potentially ignored alerts.[copy]

    ```yaml
      - alert: PrometheusRuleEvaluationFailures
        expr: increase(prometheus_rule_evaluation_failures_total[3m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus rule evaluation failures (instance {{ $labels.instance }})
          description: "Prometheus encountered {{ $value }} rule evaluation failures, leading to potentially ignored alerts.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-11) 1.1.11. Prometheus template text expansion failures

    Prometheus encountered {{ $value }} template text expansion failures[copy]

    ```yaml
      - alert: PrometheusTemplateTextExpansionFailures
        expr: increase(prometheus_template_text_expansion_failures_total[3m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus template text expansion failures (instance {{ $labels.instance }})
          description: "Prometheus encountered {{ $value }} template text expansion failures\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-12) 1.1.12. Prometheus rule evaluation slow

    Prometheus rule evaluation took more time than the scheduled interval. It indicates a slower storage backend access or too complex query.[copy]

    ```yaml
      - alert: PrometheusRuleEvaluationSlow
        expr: prometheus_rule_group_last_duration_seconds > prometheus_rule_group_interval_seconds
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Prometheus rule evaluation slow (instance {{ $labels.instance }})
          description: "Prometheus rule evaluation took more time than the scheduled interval. It indicates a slower storage backend access or too complex query.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-13) 1.1.13. Prometheus notifications backlog

    The Prometheus notification queue has not been empty for 10 minutes[copy]

    ```yaml
      - alert: PrometheusNotificationsBacklog
        expr: min_over_time(prometheus_notifications_queue_length[10m]) > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Prometheus notifications backlog (instance {{ $labels.instance }})
          description: "The Prometheus notification queue has not been empty for 10 minutes\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-14) 1.1.14. Prometheus AlertManager notification failing

    Alertmanager is failing sending notifications[copy]

    ```yaml
      - alert: PrometheusAlertmanagerNotificationFailing
        expr: rate(alertmanager_notifications_failed_total[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus AlertManager notification failing (instance {{ $labels.instance }})
          description: "Alertmanager is failing sending notifications\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-15) 1.1.15. Prometheus target empty

    Prometheus has no target in service discovery[copy]

    ```yaml
      - alert: PrometheusTargetEmpty
        expr: prometheus_sd_discovered_targets == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus target empty (instance {{ $labels.instance }})
          description: "Prometheus has no target in service discovery\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-16) 1.1.16. Prometheus target scraping slow

    Prometheus is scraping exporters slowly[copy]

    ```yaml
      - alert: PrometheusTargetScrapingSlow
        expr: prometheus_target_interval_length_seconds{quantile="0.9"} > 60
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Prometheus target scraping slow (instance {{ $labels.instance }})
          description: "Prometheus is scraping exporters slowly\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-17) 1.1.17. Prometheus large scrape

    Prometheus has many scrapes that exceed the sample limit[copy]

    ```yaml
      - alert: PrometheusLargeScrape
        expr: increase(prometheus_target_scrapes_exceeded_sample_limit_total[10m]) > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Prometheus large scrape (instance {{ $labels.instance }})
          description: "Prometheus has many scrapes that exceed the sample limit\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-18) 1.1.18. Prometheus target scrape duplicate

    Prometheus has many samples rejected due to duplicate timestamps but different values[copy]

    ```yaml
      - alert: PrometheusTargetScrapeDuplicate
        expr: increase(prometheus_target_scrapes_sample_duplicate_timestamp_total[5m]) > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Prometheus target scrape duplicate (instance {{ $labels.instance }})
          description: "Prometheus has many samples rejected due to duplicate timestamps but different values\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-19) 1.1.19. Prometheus TSDB checkpoint creation failures

    Prometheus encountered {{ $value }} checkpoint creation failures[copy]

    ```yaml
      - alert: PrometheusTsdbCheckpointCreationFailures
        expr: increase(prometheus_tsdb_checkpoint_creations_failed_total[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus TSDB checkpoint creation failures (instance {{ $labels.instance }})
          description: "Prometheus encountered {{ $value }} checkpoint creation failures\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-20) 1.1.20. Prometheus TSDB checkpoint deletion failures

    Prometheus encountered {{ $value }} checkpoint deletion failures[copy]

    ```yaml
      - alert: PrometheusTsdbCheckpointDeletionFailures
        expr: increase(prometheus_tsdb_checkpoint_deletions_failed_total[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus TSDB checkpoint deletion failures (instance {{ $labels.instance }})
          description: "Prometheus encountered {{ $value }} checkpoint deletion failures\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-21) 1.1.21. Prometheus TSDB compactions failed

    Prometheus encountered {{ $value }} TSDB compactions failures[copy]

    ```yaml
      - alert: PrometheusTsdbCompactionsFailed
        expr: increase(prometheus_tsdb_compactions_failed_total[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus TSDB compactions failed (instance {{ $labels.instance }})
          description: "Prometheus encountered {{ $value }} TSDB compactions failures\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-22) 1.1.22. Prometheus TSDB head truncations failed

    Prometheus encountered {{ $value }} TSDB head truncation failures[copy]

    ```yaml
      - alert: PrometheusTsdbHeadTruncationsFailed
        expr: increase(prometheus_tsdb_head_truncations_failed_total[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus TSDB head truncations failed (instance {{ $labels.instance }})
          description: "Prometheus encountered {{ $value }} TSDB head truncation failures\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-23) 1.1.23. Prometheus TSDB reload failures

    Prometheus encountered {{ $value }} TSDB reload failures[copy]

    ```yaml
      - alert: PrometheusTsdbReloadFailures
        expr: increase(prometheus_tsdb_reloads_failures_total[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus TSDB reload failures (instance {{ $labels.instance }})
          description: "Prometheus encountered {{ $value }} TSDB reload failures\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-24) 1.1.24. Prometheus TSDB WAL corruptions

    Prometheus encountered {{ $value }} TSDB WAL corruptions[copy]

    ```yaml
      - alert: PrometheusTsdbWalCorruptions
        expr: increase(prometheus_tsdb_wal_corruptions_total[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus TSDB WAL corruptions (instance {{ $labels.instance }})
          description: "Prometheus encountered {{ $value }} TSDB WAL corruptions\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-prometheus-self-monitoring-1-25) 1.1.25. Prometheus TSDB WAL truncations failed

    Prometheus encountered {{ $value }} TSDB WAL truncation failures[copy]

    ```yaml
      - alert: PrometheusTsdbWalTruncationsFailed
        expr: increase(prometheus_tsdb_wal_truncations_failed_total[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Prometheus TSDB WAL truncations failed (instance {{ $labels.instance }})
          description: "Prometheus encountered {{ $value }} TSDB WAL truncation failures\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#host-and-hardware-1) 1.2. Host and hardware : [node-exporter ](https://github.com/prometheus/node_exporter)(31 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-1) 1.2.1. Host out of memory

    Node memory is filling up (< 10% left)[copy]

    ```yaml
      - alert: HostOutOfMemory
        expr: node_memory_MemAvailable_bytes / node_memory_MemTotal_bytes * 100 < 10
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host out of memory (instance {{ $labels.instance }})
          description: "Node memory is filling up (< 10% left)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-2) 1.2.2. Host memory under memory pressure

    The node is under heavy memory pressure. High rate of major page faults[copy]

    ```yaml
      - alert: HostMemoryUnderMemoryPressure
        expr: rate(node_vmstat_pgmajfault[1m]) > 1000
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host memory under memory pressure (instance {{ $labels.instance }})
          description: "The node is under heavy memory pressure. High rate of major page faults\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-3) 1.2.3. Host unusual network throughput in

    Host network interfaces are probably receiving too much data (> 100 MB/s)[copy]

    ```yaml
      - alert: HostUnusualNetworkThroughputIn
        expr: sum by (instance) (rate(node_network_receive_bytes_total[2m])) / 1024 / 1024 > 100
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Host unusual network throughput in (instance {{ $labels.instance }})
          description: "Host network interfaces are probably receiving too much data (> 100 MB/s)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-4) 1.2.4. Host unusual network throughput out

    Host network interfaces are probably sending too much data (> 100 MB/s)[copy]

    ```yaml
      - alert: HostUnusualNetworkThroughputOut
        expr: sum by (instance) (rate(node_network_transmit_bytes_total[2m])) / 1024 / 1024 > 100
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Host unusual network throughput out (instance {{ $labels.instance }})
          description: "Host network interfaces are probably sending too much data (> 100 MB/s)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-5) 1.2.5. Host unusual disk read rate

    Disk is probably reading too much data (> 50 MB/s)[copy]

    ```yaml
      - alert: HostUnusualDiskReadRate
        expr: sum by (instance) (rate(node_disk_read_bytes_total[2m])) / 1024 / 1024 > 50
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Host unusual disk read rate (instance {{ $labels.instance }})
          description: "Disk is probably reading too much data (> 50 MB/s)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-6) 1.2.6. Host unusual disk write rate

    Disk is probably writing too much data (> 50 MB/s)[copy]

    ```yaml
      - alert: HostUnusualDiskWriteRate
        expr: sum by (instance) (rate(node_disk_written_bytes_total[2m])) / 1024 / 1024 > 50
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host unusual disk write rate (instance {{ $labels.instance }})
          description: "Disk is probably writing too much data (> 50 MB/s)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-7) 1.2.7. Host out of disk space

    Disk is almost full (< 10% left)[copy]

    ```yaml
      # Please add ignored mountpoints in node_exporter parameters like
      # "--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|run)($|/)".
      # Same rule using "node_filesystem_free_bytes" will fire when disk fills for non-root users.
      - alert: HostOutOfDiskSpace
        expr: (node_filesystem_avail_bytes * 100) / node_filesystem_size_bytes < 10 and ON (instance, device, mountpoint) node_filesystem_readonly == 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host out of disk space (instance {{ $labels.instance }})
          description: "Disk is almost full (< 10% left)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-8) 1.2.8. Host disk will fill in 24 hours

    Filesystem is predicted to run out of space within the next 24 hours at current write rate[copy]

    ```<!-- yaml -->
      # Please add ignored mountpoints in node_exporter parameters like
      # "--collector.filesystem.ignored-mount-points=^/(sys|proc|dev|run)($|/)".
      # Same rule using "node_filesystem_free_bytes" will fire when disk fills for non-root users.
      - alert: HostDiskWillFillIn24Hours
        expr: (node_filesystem_avail_bytes * 100) / node_filesystem_size_bytes < 10 and ON (instance, device, mountpoint) predict_linear(node_filesystem_avail_bytes{fstype!~"tmpfs"}[1h], 24 * 3600) < 0 and ON (instance, device, mountpoint) node_filesystem_readonly == 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host disk will fill in 24 hours (instance {{ $labels.instance }})
          description: "Filesystem is predicted to run out of space within the next 24 hours at current write rate\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-9) 1.2.9. Host out of inodes

    Disk is almost running out of available inodes (< 10% left)[copy]

    ```yaml
      - alert: HostOutOfInodes
        expr: node_filesystem_files_free{mountpoint ="/rootfs"} / node_filesystem_files{mountpoint="/rootfs"} * 100 < 10 and ON (instance, device, mountpoint) node_filesystem_readonly{mountpoint="/rootfs"} == 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host out of inodes (instance {{ $labels.instance }})
          description: "Disk is almost running out of available inodes (< 10% left)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-10) 1.2.10. Host inodes will fill in 24 hours

    Filesystem is predicted to run out of inodes within the next 24 hours at current write rate[copy]

    ```yaml
      - alert: HostInodesWillFillIn24Hours
        expr: node_filesystem_files_free{mountpoint ="/rootfs"} / node_filesystem_files{mountpoint="/rootfs"} * 100 < 10 and predict_linear(node_filesystem_files_free{mountpoint="/rootfs"}[1h], 24 * 3600) < 0 and ON (instance, device, mountpoint) node_filesystem_readonly{mountpoint="/rootfs"} == 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host inodes will fill in 24 hours (instance {{ $labels.instance }})
          description: "Filesystem is predicted to run out of inodes within the next 24 hours at current write rate\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-11) 1.2.11. Host unusual disk read latency

    Disk latency is growing (read operations > 100ms)[copy]

    ```yaml
      - alert: HostUnusualDiskReadLatency
        expr: rate(node_disk_read_time_seconds_total[1m]) / rate(node_disk_reads_completed_total[1m]) > 0.1 and rate(node_disk_reads_completed_total[1m]) > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host unusual disk read latency (instance {{ $labels.instance }})
          description: "Disk latency is growing (read operations > 100ms)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-12) 1.2.12. Host unusual disk write latency

    Disk latency is growing (write operations > 100ms)[copy]

    ```yaml
      - alert: HostUnusualDiskWriteLatency
        expr: rate(node_disk_write_time_seconds_total[1m]) / rate(node_disk_writes_completed_total[1m]) > 0.1 and rate(node_disk_writes_completed_total[1m]) > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host unusual disk write latency (instance {{ $labels.instance }})
          description: "Disk latency is growing (write operations > 100ms)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-13) 1.2.13. Host high CPU load

    CPU load is > 80%[copy]

    ```yaml
      - alert: HostHighCpuLoad
        expr: 100 - (avg by(instance) (rate(node_cpu_seconds_total{mode="idle"}[2m])) * 100) > 80
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Host high CPU load (instance {{ $labels.instance }})
          description: "CPU load is > 80%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-14) 1.2.14. Host CPU steal noisy neighbor

    CPU steal is > 10%. A noisy neighbor is killing VM performances or a spot instance may be out of credit.[copy]

    ```yaml
      - alert: HostCpuStealNoisyNeighbor
        expr: avg by(instance) (rate(node_cpu_seconds_total{mode="steal"}[5m])) * 100 > 10
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Host CPU steal noisy neighbor (instance {{ $labels.instance }})
          description: "CPU steal is > 10%. A noisy neighbor is killing VM performances or a spot instance may be out of credit.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-15) 1.2.15. Host context switching

    Context switching is growing on node (> 1000 / s)[copy]

    ```yaml
      # 1000 context switches is an arbitrary number.
      # Alert threshold depends on nature of application.
      # Please read: https://github.com/samber/awesome-prometheus-alerts/issues/58
      - alert: HostContextSwitching
        expr: (rate(node_context_switches_total[5m])) / (count without(cpu, mode) (node_cpu_seconds_total{mode="idle"})) > 1000
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Host context switching (instance {{ $labels.instance }})
          description: "Context switching is growing on node (> 1000 / s)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-16) 1.2.16. Host swap is filling up

    Swap is filling up (>80%)[copy]

    ```yaml
      - alert: HostSwapIsFillingUp
        expr: (1 - (node_memory_SwapFree_bytes / node_memory_SwapTotal_bytes)) * 100 > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host swap is filling up (instance {{ $labels.instance }})
          description: "Swap is filling up (>80%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-17) 1.2.17. Host systemd service crashed

    systemd service crashed[copy]

    ```yaml
      - alert: HostSystemdServiceCrashed
        expr: node_systemd_unit_state{state="failed"} == 1
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Host systemd service crashed (instance {{ $labels.instance }})
          description: "systemd service crashed\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-18) 1.2.18. Host physical component too hot

    Physical hardware component too hot[copy]

    ```yaml
      - alert: HostPhysicalComponentTooHot
        expr: node_hwmon_temp_celsius > 75
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Host physical component too hot (instance {{ $labels.instance }})
          description: "Physical hardware component too hot\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-19) 1.2.19. Host node overtemperature alarm

    Physical node temperature alarm triggered[copy]

    ```yaml
      - alert: HostNodeOvertemperatureAlarm
        expr: node_hwmon_temp_crit_alarm_celsius == 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Host node overtemperature alarm (instance {{ $labels.instance }})
          description: "Physical node temperature alarm triggered\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-20) 1.2.20. Host RAID array got inactive

    RAID array {{ $labels.device }} is in degraded state due to one or more disks failures. Number of spare drives is insufficient to fix issue automatically.[copy]

    ```yaml
      - alert: HostRaidArrayGotInactive
        expr: node_md_state{state="inactive"} > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Host RAID array got inactive (instance {{ $labels.instance }})
          description: "RAID array {{ $labels.device }} is in degraded state due to one or more disks failures. Number of spare drives is insufficient to fix issue automatically.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-21) 1.2.21. Host RAID disk failure

    At least one device in RAID array on {{ $labels.instance }} failed. Array {{ $labels.md_device }} needs attention and possibly a disk swap[copy]

    ```yaml
      - alert: HostRaidDiskFailure
        expr: node_md_disks{state="failed"} > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host RAID disk failure (instance {{ $labels.instance }})
          description: "At least one device in RAID array on {{ $labels.instance }} failed. Array {{ $labels.md_device }} needs attention and possibly a disk swap\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-22) 1.2.22. Host kernel version deviations

    Different kernel versions are running[copy]

    ```yaml
      - alert: HostKernelVersionDeviations
        expr: count(sum(label_replace(node_uname_info, "kernel", "$1", "release", "([0-9]+.[0-9]+.[0-9]+).*")) by (kernel)) > 1
        for: 6h
        labels:
          severity: warning
        annotations:
          summary: Host kernel version deviations (instance {{ $labels.instance }})
          description: "Different kernel versions are running\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-23) 1.2.23. Host OOM kill detected

    OOM kill detected[copy]

    ```yaml
      - alert: HostOomKillDetected
        expr: increase(node_vmstat_oom_kill[1m]) > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Host OOM kill detected (instance {{ $labels.instance }})
          description: "OOM kill detected\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-24) 1.2.24. Host EDAC Correctable Errors detected

    Host {{ $labels.instance }} has had {{ printf "%.0f" $value }} correctable memory errors reported by EDAC in the last 5 minutes.[copy]

    ```yaml
      - alert: HostEdacCorrectableErrorsDetected
        expr: increase(node_edac_correctable_errors_total[1m]) > 0
        for: 0m
        labels:
          severity: info
        annotations:
          summary: Host EDAC Correctable Errors detected (instance {{ $labels.instance }})
          description: "Host {{ $labels.instance }} has had {{ printf \"%.0f\" $value }} correctable memory errors reported by EDAC in the last 5 minutes.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-25) 1.2.25. Host EDAC Uncorrectable Errors detected

    Host {{ $labels.instance }} has had {{ printf "%.0f" $value }} uncorrectable memory errors reported by EDAC in the last 5 minutes.[copy]

    ```yaml
      - alert: HostEdacUncorrectableErrorsDetected
        expr: node_edac_uncorrectable_errors_total > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Host EDAC Uncorrectable Errors detected (instance {{ $labels.instance }})
          description: "Host {{ $labels.instance }} has had {{ printf \"%.0f\" $value }} uncorrectable memory errors reported by EDAC in the last 5 minutes.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-26) 1.2.26. Host Network Receive Errors

    Host {{ $labels.instance }} interface {{ $labels.device }} has encountered {{ printf "%.0f" $value }} receive errors in the last two minutes.[copy]

    ```yaml
      - alert: HostNetworkReceiveErrors
        expr: rate(node_network_receive_errs_total[2m]) / rate(node_network_receive_packets_total[2m]) > 0.01
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host Network Receive Errors (instance {{ $labels.instance }})
          description: "Host {{ $labels.instance }} interface {{ $labels.device }} has encountered {{ printf \"%.0f\" $value }} receive errors in the last two minutes.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-27) 1.2.27. Host Network Transmit Errors

    Host {{ $labels.instance }} interface {{ $labels.device }} has encountered {{ printf "%.0f" $value }} transmit errors in the last two minutes.[copy]

    ```yaml
      - alert: HostNetworkTransmitErrors
        expr: rate(node_network_transmit_errs_total[2m]) / rate(node_network_transmit_packets_total[2m]) > 0.01
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host Network Transmit Errors (instance {{ $labels.instance }})
          description: "Host {{ $labels.instance }} interface {{ $labels.device }} has encountered {{ printf \"%.0f\" $value }} transmit errors in the last two minutes.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-28) 1.2.28. Host Network Interface Saturated

    The network interface "{{ $labels.device }}" on "{{ $labels.instance }}" is getting overloaded.[copy]

    ```yaml
      - alert: HostNetworkInterfaceSaturated
        expr: (rate(node_network_receive_bytes_total{device!~"^tap.*"}[1m]) + rate(node_network_transmit_bytes_total{device!~"^tap.*"}[1m])) / node_network_speed_bytes{device!~"^tap.*"} > 0.8 < 10000
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Host Network Interface Saturated (instance {{ $labels.instance }})
          description: "The network interface \"{{ $labels.device }}\" on \"{{ $labels.instance }}\" is getting overloaded.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-29) 1.2.29. Host conntrack limit

    The number of conntrack is approaching limit[copy]

    ```yaml
      - alert: HostConntrackLimit
        expr: node_nf_conntrack_entries / node_nf_conntrack_entries_limit > 0.8
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Host conntrack limit (instance {{ $labels.instance }})
          description: "The number of conntrack is approaching limit\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-30) 1.2.30. Host clock skew

    Clock skew detected. Clock is out of sync.[copy]

    ```yaml
      - alert: HostClockSkew
        expr: (node_timex_offset_seconds > 0.05 and deriv(node_timex_offset_seconds[5m]) >= 0) or (node_timex_offset_seconds < -0.05 and deriv(node_timex_offset_seconds[5m]) <= 0)
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host clock skew (instance {{ $labels.instance }})
          description: "Clock skew detected. Clock is out of sync.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-host-and-hardware-1-31) 1.2.31. Host clock not synchronising

    Clock not synchronising.[copy]

    ```yaml
      - alert: HostClockNotSynchronising
        expr: min_over_time(node_timex_sync_status[1m]) == 0 and node_timex_maxerror_seconds >= 16
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Host clock not synchronising (instance {{ $labels.instance }})
          description: "Clock not synchronising.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#docker-containers-1) 1.3. Docker containers : [google/cAdvisor ](https://github.com/google/cadvisor)(7 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-docker-containers-1-1) 1.3.1. Container killed

    A container has disappeared[copy]

    ```yaml
      # This rule can be very noisy in dynamic infra with legitimate container start/stop/deployment.
      - alert: ContainerKilled
        expr: time() - container_last_seen > 60
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Container killed (instance {{ $labels.instance }})
          description: "A container has disappeared\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-docker-containers-1-2) 1.3.2. Container absent

    A container is absent for 5 min[copy]

    ```yaml
      # This rule can be very noisy in dynamic infra with legitimate container start/stop/deployment.
      - alert: ContainerAbsent
        expr: absent(container_last_seen)
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Container absent (instance {{ $labels.instance }})
          description: "A container is absent for 5 min\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-docker-containers-1-3) 1.3.3. Container CPU usage

    Container CPU usage is above 80%[copy]

    ```yaml
      # cAdvisor can sometimes consume a lot of CPU, so this alert will fire constantly.
      # If you want to exclude it from this alert, exclude the serie having an empty name: container_cpu_usage_seconds_total{name!=""}
      - alert: ContainerCpuUsage
        expr: (sum(rate(container_cpu_usage_seconds_total[3m])) BY (instance, name) * 100) > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Container CPU usage (instance {{ $labels.instance }})
          description: "Container CPU usage is above 80%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-docker-containers-1-4) 1.3.4. Container Memory usage

    Container Memory usage is above 80%[copy]

    ```yaml
      # See https://medium.com/faun/how-much-is-too-much-the-linux-oomkiller-and-used-memory-d32186f29c9d
      - alert: ContainerMemoryUsage
        expr: (sum(container_memory_working_set_bytes) BY (instance, name) / sum(container_spec_memory_limit_bytes > 0) BY (instance, name) * 100) > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Container Memory usage (instance {{ $labels.instance }})
          description: "Container Memory usage is above 80%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-docker-containers-1-5) 1.3.5. Container Volume usage

    Container Volume usage is above 80%[copy]

    ```yaml
      - alert: ContainerVolumeUsage
        expr: (1 - (sum(container_fs_inodes_free) BY (instance) / sum(container_fs_inodes_total) BY (instance))) * 100 > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Container Volume usage (instance {{ $labels.instance }})
          description: "Container Volume usage is above 80%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-docker-containers-1-6) 1.3.6. Container Volume IO usage

    Container Volume IO usage is above 80%[copy]

    ```yaml
      - alert: ContainerVolumeIoUsage
        expr: (sum(container_fs_io_current) BY (instance, name) * 100) > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Container Volume IO usage (instance {{ $labels.instance }})
          description: "Container Volume IO usage is above 80%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-docker-containers-1-7) 1.3.7. Container high throttle rate

    Container is being throttled[copy]

    ```yaml
      - alert: ContainerHighThrottleRate
        expr: rate(container_cpu_cfs_throttled_seconds_total[3m]) > 1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Container high throttle rate (instance {{ $labels.instance }})
          description: "Container is being throttled\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#blackbox-1) 1.4. Blackbox : [prometheus/blackbox_exporter ](https://github.com/prometheus/blackbox_exporter)(8 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-blackbox-1-1) 1.4.1. Blackbox probe failed

    Probe failed[copy]

    ```yaml
      - alert: BlackboxProbeFailed
        expr: probe_success == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Blackbox probe failed (instance {{ $labels.instance }})
          description: "Probe failed\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-blackbox-1-2) 1.4.2. Blackbox slow probe

    Blackbox probe took more than 1s to complete[copy]

    ```yaml
      - alert: BlackboxSlowProbe
        expr: avg_over_time(probe_duration_seconds[1m]) > 1
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Blackbox slow probe (instance {{ $labels.instance }})
          description: "Blackbox probe took more than 1s to complete\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-blackbox-1-3) 1.4.3. Blackbox probe HTTP failure

    HTTP status code is not 200-399[copy]

    ```yaml
      - alert: BlackboxProbeHttpFailure
        expr: probe_http_status_code <= 199 OR probe_http_status_code >= 400
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Blackbox probe HTTP failure (instance {{ $labels.instance }})
          description: "HTTP status code is not 200-399\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-blackbox-1-4) 1.4.4. Blackbox SSL certificate will expire soon

    SSL certificate expires in 30 days[copy]

    ```yaml
      - alert: BlackboxSslCertificateWillExpireSoon
        expr: probe_ssl_earliest_cert_expiry - time() < 86400 * 30
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Blackbox SSL certificate will expire soon (instance {{ $labels.instance }})
          description: "SSL certificate expires in 30 days\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-blackbox-1-5) 1.4.5. Blackbox SSL certificate will expire soon

    SSL certificate expires in 3 days[copy]

    ```yaml
      - alert: BlackboxSslCertificateWillExpireSoon
        expr: probe_ssl_earliest_cert_expiry - time() < 86400 * 3
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Blackbox SSL certificate will expire soon (instance {{ $labels.instance }})
          description: "SSL certificate expires in 3 days\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-blackbox-1-6) 1.4.6. Blackbox SSL certificate expired

    SSL certificate has expired already[copy]

    ```yaml
      - alert: BlackboxSslCertificateExpired
        expr: probe_ssl_earliest_cert_expiry - time() <= 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Blackbox SSL certificate expired (instance {{ $labels.instance }})
          description: "SSL certificate has expired already\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-blackbox-1-7) 1.4.7. Blackbox probe slow HTTP

    HTTP request took more than 1s[copy]

    ```yaml
      - alert: BlackboxProbeSlowHttp
        expr: avg_over_time(probe_http_duration_seconds[1m]) > 1
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Blackbox probe slow HTTP (instance {{ $labels.instance }})
          description: "HTTP request took more than 1s\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-blackbox-1-8) 1.4.8. Blackbox probe slow ping

    Blackbox ping took more than 1s[copy]

    ```yaml
      - alert: BlackboxProbeSlowPing
        expr: avg_over_time(probe_icmp_duration_seconds[1m]) > 1
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Blackbox probe slow ping (instance {{ $labels.instance }})
          description: "Blackbox ping took more than 1s\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#windows-server-1) 1.5. Windows Server : [prometheus-community/windows_exporter ](https://github.com/prometheus-community/windows_exporter)(5 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-windows-server-1-1) 1.5.1. Windows Server collector Error

    Collector {{ $labels.collector }} was not successful[copy]

    ```yaml
      - alert: WindowsServerCollectorError
        expr: windows_exporter_collector_success == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Windows Server collector Error (instance {{ $labels.instance }})
          description: "Collector {{ $labels.collector }} was not successful\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-windows-server-1-2) 1.5.2. Windows Server service Status

    Windows Service state is not OK[copy]

    ```yaml
      - alert: WindowsServerServiceStatus
        expr: windows_service_status{status="ok"} != 1
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Windows Server service Status (instance {{ $labels.instance }})
          description: "Windows Service state is not OK\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-windows-server-1-3) 1.5.3. Windows Server CPU Usage

    CPU Usage is more than 80%[copy]

    ```yaml
      - alert: WindowsServerCpuUsage
        expr: 100 - (avg by (instance) (rate(windows_cpu_time_total{mode="idle"}[2m])) * 100) > 80
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Windows Server CPU Usage (instance {{ $labels.instance }})
          description: "CPU Usage is more than 80%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-windows-server-1-4) 1.5.4. Windows Server memory Usage

    Memory usage is more than 90%[copy]

    ```yaml
      - alert: WindowsServerMemoryUsage
        expr: 100 - ((windows_os_physical_memory_free_bytes / windows_cs_physical_memory_bytes) * 100) > 90
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Windows Server memory Usage (instance {{ $labels.instance }})
          description: "Memory usage is more than 90%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-windows-server-1-5) 1.5.5. Windows Server disk Space Usage

    Disk usage is more than 80%[copy]

    ```yaml
      - alert: WindowsServerDiskSpaceUsage
        expr: 100.0 - 100 * ((windows_logical_disk_free_bytes / 1024 / 1024 ) / (windows_logical_disk_size_bytes / 1024 / 1024)) > 80
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Windows Server disk Space Usage (instance {{ $labels.instance }})
          description: "Disk usage is more than 80%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#vmware-1) 1.6. VMware : [pryorda/vmware_exporter ](https://github.com/pryorda/vmware_exporter)(4 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-vmware-1-1) 1.6.1. Virtual Machine Memory Warning

    High memory usage on {{ $labels.instance }}: {{ $value | printf "%.2f"}}%[copy]

    ```yaml
      - alert: VirtualMachineMemoryWarning
        expr: vmware_vm_mem_usage_average / 100 >= 80 and vmware_vm_mem_usage_average / 100 < 90
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Virtual Machine Memory Warning (instance {{ $labels.instance }})
          description: "High memory usage on {{ $labels.instance }}: {{ $value | printf \"%.2f\"}}%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-vmware-1-2) 1.6.2. Virtual Machine Memory Critical

    High memory usage on {{ $labels.instance }}: {{ $value | printf "%.2f"}}%[copy]

    ```yaml
      - alert: VirtualMachineMemoryCritical
        expr: vmware_vm_mem_usage_average / 100 >= 90
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Virtual Machine Memory Critical (instance {{ $labels.instance }})
          description: "High memory usage on {{ $labels.instance }}: {{ $value | printf \"%.2f\"}}%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-vmware-1-3) 1.6.3. High Number of Snapshots

    High snapshots number on {{ $labels.instance }}: {{ $value }}[copy]

    ```yaml
      - alert: HighNumberOfSnapshots
        expr: vmware_vm_snapshots > 3
        for: 30m
        labels:
          severity: warning
        annotations:
          summary: High Number of Snapshots (instance {{ $labels.instance }})
          description: "High snapshots number on {{ $labels.instance }}: {{ $value }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-vmware-1-4) 1.6.4. Outdated Snapshots

    Outdated snapshots on {{ $labels.instance }}: {{ $value | printf "%.0f"}} days[copy]

    ```yaml
      - alert: OutdatedSnapshots
        expr: (time() - vmware_vm_snapshot_timestamp_seconds) / (60 * 60 * 24) >= 3
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Outdated Snapshots (instance {{ $labels.instance }})
          description: "Outdated snapshots on {{ $labels.instance }}: {{ $value | printf \"%.0f\"}} days\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#netdata-1) 1.7. Netdata : [Embedded exporter ](https://github.com/netdata/netdata/blob/master/backends/prometheus/README.md)(9 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-netdata-1-1) 1.7.1. Netdata high cpu usage

    Netdata high CPU usage (> 80%)[copy]

    ```yaml
      - alert: NetdataHighCpuUsage
        expr: rate(netdata_cpu_cpu_percentage_average{dimension="idle"}[1m]) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Netdata high cpu usage (instance {{ $labels.instance }})
          description: "Netdata high CPU usage (> 80%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-netdata-1-2) 1.7.2. Host CPU steal noisy neighbor

    CPU steal is > 10%. A noisy neighbor is killing VM performances or a spot instance may be out of credit.[copy]

    ```yaml
      - alert: HostCpuStealNoisyNeighbor
        expr: rate(netdata_cpu_cpu_percentage_average{dimension="steal"}[1m]) > 10
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Host CPU steal noisy neighbor (instance {{ $labels.instance }})
          description: "CPU steal is > 10%. A noisy neighbor is killing VM performances or a spot instance may be out of credit.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-netdata-1-3) 1.7.3. Netdata high memory usage

    Netdata high memory usage (> 80%)[copy]

    ```yaml
      - alert: NetdataHighMemoryUsage
        expr: 100 / netdata_system_ram_MB_average * netdata_system_ram_MB_average{dimension=~"free|cached"} < 20
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Netdata high memory usage (instance {{ $labels.instance }})
          description: "Netdata high memory usage (> 80%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-netdata-1-4) 1.7.4. Netdata low disk space

    Netdata low disk space (> 80%)[copy]

    ```yaml
      - alert: NetdataLowDiskSpace
        expr: 100 / netdata_disk_space_GB_average * netdata_disk_space_GB_average{dimension=~"avail|cached"} < 20
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Netdata low disk space (instance {{ $labels.instance }})
          description: "Netdata low disk space (> 80%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-netdata-1-5) 1.7.5. Netdata predicted disk full

    Netdata predicted disk full in 24 hours[copy]

    ```yaml
      - alert: NetdataPredictedDiskFull
        expr: predict_linear(netdata_disk_space_GB_average{dimension=~"avail|cached"}[3h], 24 * 3600) < 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Netdata predicted disk full (instance {{ $labels.instance }})
          description: "Netdata predicted disk full in 24 hours\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-netdata-1-6) 1.7.6. Netdata MD mismatch cnt unsynchronized blocks

    RAID Array have unsynchronized blocks[copy]

    ```yaml
      - alert: NetdataMdMismatchCntUnsynchronizedBlocks
        expr: netdata_md_mismatch_cnt_unsynchronized_blocks_average > 1024
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Netdata MD mismatch cnt unsynchronized blocks (instance {{ $labels.instance }})
          description: "RAID Array have unsynchronized blocks\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-netdata-1-7) 1.7.7. Netdata disk reallocated sectors

    Reallocated sectors on disk[copy]

    ```yaml
      - alert: NetdataDiskReallocatedSectors
        expr: increase(netdata_smartd_log_reallocated_sectors_count_sectors_average[1m]) > 0
        for: 0m
        labels:
          severity: info
        annotations:
          summary: Netdata disk reallocated sectors (instance {{ $labels.instance }})
          description: "Reallocated sectors on disk\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-netdata-1-8) 1.7.8. Netdata disk current pending sector

    Disk current pending sector[copy]

    ```yaml
      - alert: NetdataDiskCurrentPendingSector
        expr: netdata_smartd_log_current_pending_sector_count_sectors_average > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Netdata disk current pending sector (instance {{ $labels.instance }})
          description: "Disk current pending sector\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-netdata-1-9) 1.7.9. Netdata reported uncorrectable disk sectors

    Reported uncorrectable disk sectors[copy]

    ```yaml
      - alert: NetdataReportedUncorrectableDiskSectors
        expr: increase(netdata_smartd_log_offline_uncorrectable_sector_count_sectors_average[2m]) > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Netdata reported uncorrectable disk sectors (instance {{ $labels.instance }})
          description: "Reported uncorrectable disk sectors\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#mysql-1) 2.1. MySQL : [prometheus/mysqld_exporter ](https://github.com/prometheus/mysqld_exporter)(9 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mysql-1-1) 2.1.1. MySQL down

    MySQL instance is down on {{ $labels.instance }}[copy]

    ```yaml
      - alert: MysqlDown
        expr: mysql_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: MySQL down (instance {{ $labels.instance }})
          description: "MySQL instance is down on {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mysql-1-2) 2.1.2. MySQL too many connections (> 80%)

    More than 80% of MySQL connections are in use on {{ $labels.instance }}[copy]

    ```yaml
      - alert: MysqlTooManyConnections(>80%)
        expr: avg by (instance) (rate(mysql_global_status_threads_connected[1m])) / avg by (instance) (mysql_global_variables_max_connections) * 100 > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: MySQL too many connections (> 80%) (instance {{ $labels.instance }})
          description: "More than 80% of MySQL connections are in use on {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mysql-1-3) 2.1.3. MySQL high threads running

    More than 60% of MySQL connections are in running state on {{ $labels.instance }}[copy]

    ```yaml
      - alert: MysqlHighThreadsRunning
        expr: avg by (instance) (rate(mysql_global_status_threads_running[1m])) / avg by (instance) (mysql_global_variables_max_connections) * 100 > 60
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: MySQL high threads running (instance {{ $labels.instance }})
          description: "More than 60% of MySQL connections are in running state on {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mysql-1-4) 2.1.4. MySQL Slave IO thread not running

    MySQL Slave IO thread not running on {{ $labels.instance }}[copy]

    ```yaml
      - alert: MysqlSlaveIoThreadNotRunning
        expr: mysql_slave_status_master_server_id > 0 and ON (instance) mysql_slave_status_slave_io_running == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: MySQL Slave IO thread not running (instance {{ $labels.instance }})
          description: "MySQL Slave IO thread not running on {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mysql-1-5) 2.1.5. MySQL Slave SQL thread not running

    MySQL Slave SQL thread not running on {{ $labels.instance }}[copy]

    ```yaml
      - alert: MysqlSlaveSqlThreadNotRunning
        expr: mysql_slave_status_master_server_id > 0 and ON (instance) mysql_slave_status_slave_sql_running == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: MySQL Slave SQL thread not running (instance {{ $labels.instance }})
          description: "MySQL Slave SQL thread not running on {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mysql-1-6) 2.1.6. MySQL Slave replication lag

    MySQL replication lag on {{ $labels.instance }}[copy]

    ```yaml
      - alert: MysqlSlaveReplicationLag
        expr: mysql_slave_status_master_server_id > 0 and ON (instance) (mysql_slave_status_seconds_behind_master - mysql_slave_status_sql_delay) > 30
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: MySQL Slave replication lag (instance {{ $labels.instance }})
          description: "MySQL replication lag on {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mysql-1-7) 2.1.7. MySQL slow queries

    MySQL server mysql has some new slow query.[copy]

    ```yaml
      - alert: MysqlSlowQueries
        expr: increase(mysql_global_status_slow_queries[1m]) > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: MySQL slow queries (instance {{ $labels.instance }})
          description: "MySQL server mysql has some new slow query.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mysql-1-8) 2.1.8. MySQL InnoDB log waits

    MySQL innodb log writes stalling[copy]

    ```yaml
      - alert: MysqlInnodbLogWaits
        expr: rate(mysql_global_status_innodb_log_waits[15m]) > 10
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: MySQL InnoDB log waits (instance {{ $labels.instance }})
          description: "MySQL innodb log writes stalling\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mysql-1-9) 2.1.9. MySQL restarted

    MySQL has just been restarted, less than one minute ago on {{ $labels.instance }}.[copy]

    ```yaml
      - alert: MysqlRestarted
        expr: mysql_global_status_uptime < 60
        for: 0m
        labels:
          severity: info
        annotations:
          summary: MySQL restarted (instance {{ $labels.instance }})
          description: "MySQL has just been restarted, less than one minute ago on {{ $labels.instance }}.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#postgresql-1) 2.2. PostgreSQL : [wrouesnel/postgres_exporter ](https://github.com/wrouesnel/postgres_exporter/)(25 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-1) 2.2.1. Postgresql down

    Postgresql instance is down[copy]

    ```yaml
      - alert: PostgresqlDown
        expr: pg_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Postgresql down (instance {{ $labels.instance }})
          description: "Postgresql instance is down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-2) 2.2.2. Postgresql restarted

    Postgresql restarted[copy]

    ```yaml
      - alert: PostgresqlRestarted
        expr: time() - pg_postmaster_start_time_seconds < 60
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Postgresql restarted (instance {{ $labels.instance }})
          description: "Postgresql restarted\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-3) 2.2.3. Postgresql exporter error

    Postgresql exporter is showing errors. A query may be buggy in query.yaml[copy]

    ```yaml
      - alert: PostgresqlExporterError
        expr: pg_exporter_last_scrape_error > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Postgresql exporter error (instance {{ $labels.instance }})
          description: "Postgresql exporter is showing errors. A query may be buggy in query.yaml\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-4) 2.2.4. Postgresql replication lag

    PostgreSQL replication lag is going up (> 30s)[copy]

    ```yaml
      - alert: PostgresqlReplicationLag
        expr: pg_replication_lag > 30 and ON(instance) pg_replication_is_replica == 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Postgresql replication lag (instance {{ $labels.instance }})
          description: "PostgreSQL replication lag is going up (> 30s)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-5) 2.2.5. Postgresql table not vacuumed

    Table has not been vacuumed for 24 hours[copy]

    ```yaml
      - alert: PostgresqlTableNotVacuumed
        expr: time() - pg_stat_user_tables_last_autovacuum > 60 * 60 * 24
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Postgresql table not vacuumed (instance {{ $labels.instance }})
          description: "Table has not been vacuumed for 24 hours\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-6) 2.2.6. Postgresql table not analyzed

    Table has not been analyzed for 24 hours[copy]

    ```yaml
      - alert: PostgresqlTableNotAnalyzed
        expr: time() - pg_stat_user_tables_last_autoanalyze > 60 * 60 * 24
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Postgresql table not analyzed (instance {{ $labels.instance }})
          description: "Table has not been analyzed for 24 hours\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-7) 2.2.7. Postgresql too many connections

    PostgreSQL instance has too many connections (> 80%).[copy]

    ```yaml
      - alert: PostgresqlTooManyConnections
        expr: sum by (datname) (pg_stat_activity_count{datname!~"template.*|postgres"}) > pg_settings_max_connections * 0.8
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Postgresql too many connections (instance {{ $labels.instance }})
          description: "PostgreSQL instance has too many connections (> 80%).\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-8) 2.2.8. Postgresql not enough connections

    PostgreSQL instance should have more connections (> 5)[copy]

    ```yaml
      - alert: PostgresqlNotEnoughConnections
        expr: sum by (datname) (pg_stat_activity_count{datname!~"template.*|postgres"}) < 5
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Postgresql not enough connections (instance {{ $labels.instance }})
          description: "PostgreSQL instance should have more connections (> 5)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-9) 2.2.9. Postgresql dead locks

    PostgreSQL has dead-locks[copy]

    ```yaml
      - alert: PostgresqlDeadLocks
        expr: increase(pg_stat_database_deadlocks{datname!~"template.*|postgres"}[1m]) > 5
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Postgresql dead locks (instance {{ $labels.instance }})
          description: "PostgreSQL has dead-locks\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-10) 2.2.10. Postgresql slow queries

    PostgreSQL executes slow queries[copy]

    ```yaml
      - alert: PostgresqlSlowQueries
        expr: pg_slow_queries > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Postgresql slow queries (instance {{ $labels.instance }})
          description: "PostgreSQL executes slow queries\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-11) 2.2.11. Postgresql high rollback rate

    Ratio of transactions being aborted compared to committed is > 2 %[copy]

    ```yaml
      - alert: PostgresqlHighRollbackRate
        expr: rate(pg_stat_database_xact_rollback{datname!~"template.*"}[3m]) / rate(pg_stat_database_xact_commit{datname!~"template.*"}[3m]) > 0.02
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Postgresql high rollback rate (instance {{ $labels.instance }})
          description: "Ratio of transactions being aborted compared to committed is > 2 %\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-12) 2.2.12. Postgresql commit rate low

    Postgres seems to be processing very few transactions[copy]

    ```yaml
      - alert: PostgresqlCommitRateLow
        expr: rate(pg_stat_database_xact_commit[1m]) < 10
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Postgresql commit rate low (instance {{ $labels.instance }})
          description: "Postgres seems to be processing very few transactions\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-13) 2.2.13. Postgresql low XID consumption

    Postgresql seems to be consuming transaction IDs very slowly[copy]

    ```yaml
      - alert: PostgresqlLowXidConsumption
        expr: rate(pg_txid_current[1m]) < 5
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Postgresql low XID consumption (instance {{ $labels.instance }})
          description: "Postgresql seems to be consuming transaction IDs very slowly\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-14) 2.2.14. Postgresqllow XLOG consumption

    Postgres seems to be consuming XLOG very slowly[copy]

    ```yaml
      - alert: PostgresqllowXlogConsumption
        expr: rate(pg_xlog_position_bytes[1m]) < 100
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Postgresqllow XLOG consumption (instance {{ $labels.instance }})
          description: "Postgres seems to be consuming XLOG very slowly\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-15) 2.2.15. Postgresql WALE replication stopped

    WAL-E replication seems to be stopped[copy]

    ```yaml
      - alert: PostgresqlWaleReplicationStopped
        expr: rate(pg_xlog_position_bytes[1m]) == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Postgresql WALE replication stopped (instance {{ $labels.instance }})
          description: "WAL-E replication seems to be stopped\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-16) 2.2.16. Postgresql high rate statement timeout

    Postgres transactions showing high rate of statement timeouts[copy]

    ```yaml
      - alert: PostgresqlHighRateStatementTimeout
        expr: rate(postgresql_errors_total{type="statement_timeout"}[1m]) > 3
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Postgresql high rate statement timeout (instance {{ $labels.instance }})
          description: "Postgres transactions showing high rate of statement timeouts\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-17) 2.2.17. Postgresql high rate deadlock

    Postgres detected deadlocks[copy]

    ```yaml
      - alert: PostgresqlHighRateDeadlock
        expr: increase(postgresql_errors_total{type="deadlock_detected"}[1m]) > 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Postgresql high rate deadlock (instance {{ $labels.instance }})
          description: "Postgres detected deadlocks\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-18) 2.2.18. Postgresql replication lag bytes

    Postgres Replication lag (in bytes) is high[copy]

    ```yaml
      - alert: PostgresqlReplicationLagBytes
        expr: (pg_xlog_position_bytes and pg_replication_is_replica == 0) - on(environment) group_right(instance) (pg_xlog_position_bytes and pg_replication_is_replica == 1) > 1e+09
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Postgresql replication lag bytes (instance {{ $labels.instance }})
          description: "Postgres Replication lag (in bytes) is high\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-19) 2.2.19. Postgresql unused replication slot

    Unused Replication Slots[copy]

    ```yaml
      - alert: PostgresqlUnusedReplicationSlot
        expr: pg_replication_slots_active == 0
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Postgresql unused replication slot (instance {{ $labels.instance }})
          description: "Unused Replication Slots\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-20) 2.2.20. Postgresql too many dead tuples

    PostgreSQL dead tuples is too large[copy]

    ```yaml
      - alert: PostgresqlTooManyDeadTuples
        expr: ((pg_stat_user_tables_n_dead_tup > 10000) / (pg_stat_user_tables_n_live_tup + pg_stat_user_tables_n_dead_tup)) >= 0.1 unless ON(instance) (pg_replication_is_replica == 1)
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Postgresql too many dead tuples (instance {{ $labels.instance }})
          description: "PostgreSQL dead tuples is too large\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-21) 2.2.21. Postgresql split brain

    Split Brain, too many primary Postgresql databases in read-write mode[copy]

    ```yaml
      - alert: PostgresqlSplitBrain
        expr: count(pg_replication_is_replica == 0) != 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Postgresql split brain (instance {{ $labels.instance }})
          description: "Split Brain, too many primary Postgresql databases in read-write mode\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-22) 2.2.22. Postgresql promoted node

    Postgresql standby server has been promoted as primary node[copy]

    ```yaml
      - alert: PostgresqlPromotedNode
        expr: pg_replication_is_replica and changes(pg_replication_is_replica[1m]) > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Postgresql promoted node (instance {{ $labels.instance }})
          description: "Postgresql standby server has been promoted as primary node\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-23) 2.2.23. Postgresql configuration changed

    Postgres Database configuration change has occurred[copy]

    ```yaml
      - alert: PostgresqlConfigurationChanged
        expr: {__name__=~"pg_settings_.*"} != ON(__name__) {__name__=~"pg_settings_([^t]|t[^r]|tr[^a]|tra[^n]|tran[^s]|trans[^a]|transa[^c]|transac[^t]|transact[^i]|transacti[^o]|transactio[^n]|transaction[^_]|transaction_[^r]|transaction_r[^e]|transaction_re[^a]|transaction_rea[^d]|transaction_read[^_]|transaction_read_[^o]|transaction_read_o[^n]|transaction_read_on[^l]|transaction_read_onl[^y]).*"} OFFSET 5m
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Postgresql configuration changed (instance {{ $labels.instance }})
          description: "Postgres Database configuration change has occurred\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-24) 2.2.24. Postgresql SSL compression active

    Database connections with SSL compression enabled. This may add significant jitter in replication delay. Replicas should turn off SSL compression via `sslcompression=0` in `recovery.conf`.[copy]

    ```yaml
      - alert: PostgresqlSslCompressionActive
        expr: sum(pg_stat_ssl_compression) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Postgresql SSL compression active (instance {{ $labels.instance }})
          description: "Database connections with SSL compression enabled. This may add significant jitter in replication delay. Replicas should turn off SSL compression via `sslcompression=0` in `recovery.conf`.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-postgresql-1-25) 2.2.25. Postgresql too many locks acquired

    Too many locks acquired on the database. If this alert happens frequently, we may need to increase the postgres setting max_locks_per_transaction.[copy]

    ```yaml
      - alert: PostgresqlTooManyLocksAcquired
        expr: ((sum (pg_locks_count)) / (pg_settings_max_locks_per_transaction * pg_settings_max_connections)) > 0.20
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Postgresql too many locks acquired (instance {{ $labels.instance }})
          description: "Too many locks acquired on the database. If this alert happens frequently, we may need to increase the postgres setting max_locks_per_transaction.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#sql-server-1) 2.3. SQL Server : [Ozarklake/prometheus-mssql-exporter ](https://github.com/Ozarklake/prometheus-mssql-exporter)(2 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-sql-server-1-1) 2.3.1. SQL Server down

    SQL server instance is down[copy]

    ```yaml
      - alert: SqlServerDown
        expr: mssql_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: SQL Server down (instance {{ $labels.instance }})
          description: "SQL server instance is down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-sql-server-1-2) 2.3.2. SQL Server deadlock

    SQL Server is having some deadlock.[copy]

    ```yaml
      - alert: SqlServerDeadlock
        expr: increase(mssql_deadlocks[1m]) > 5
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: SQL Server deadlock (instance {{ $labels.instance }})
          description: "SQL Server is having some deadlock.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#pgbouncer-1) 2.4. PGBouncer : [spreaker/prometheus-pgbouncer-exporter ](https://github.com/spreaker/prometheus-pgbouncer-exporter)(3 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-pgbouncer-1-1) 2.4.1. PGBouncer active connections

    PGBouncer pools are filling up[copy]

    ```yaml
      - alert: PgbouncerActiveConnections
        expr: pgbouncer_pools_server_active_connections > 200
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: PGBouncer active connections (instance {{ $labels.instance }})
          description: "PGBouncer pools are filling up\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-pgbouncer-1-2) 2.4.2. PGBouncer errors

    PGBouncer is logging errors. This may be due to a a server restart or an admin typing commands at the pgbouncer console.[copy]

    ```yaml
      - alert: PgbouncerErrors
        expr: increase(pgbouncer_errors_count{errmsg!="server conn crashed?"}[1m]) > 10
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: PGBouncer errors (instance {{ $labels.instance }})
          description: "PGBouncer is logging errors. This may be due to a a server restart or an admin typing commands at the pgbouncer console.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-pgbouncer-1-3) 2.4.3. PGBouncer max connections

    The number of PGBouncer client connections has reached max_client_conn.[copy]

    ```yaml
      - alert: PgbouncerMaxConnections
        expr: increase(pgbouncer_errors_count{errmsg="no more connections allowed (max_client_conn)"}[30s]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: PGBouncer max connections (instance {{ $labels.instance }})
          description: "The number of PGBouncer client connections has reached max_client_conn.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#redis-1) 2.5. Redis : [oliver006/redis_exporter ](https://github.com/oliver006/redis_exporter)(12 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-redis-1-1) 2.5.1. Redis down

    Redis instance is down[copy]

    ```yaml
      - alert: RedisDown
        expr: redis_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Redis down (instance {{ $labels.instance }})
          description: "Redis instance is down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-redis-1-2) 2.5.2. Redis missing master

    Redis cluster has no node marked as master.[copy]

    ```yaml
      - alert: RedisMissingMaster
        expr: (count(redis_instance_info{role="master"}) or vector(0)) < 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Redis missing master (instance {{ $labels.instance }})
          description: "Redis cluster has no node marked as master.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-redis-1-3) 2.5.3. Redis too many masters

    Redis cluster has too many nodes marked as master.[copy]

    ```yaml
      - alert: RedisTooManyMasters
        expr: count(redis_instance_info{role="master"}) > 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Redis too many masters (instance {{ $labels.instance }})
          description: "Redis cluster has too many nodes marked as master.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-redis-1-4) 2.5.4. Redis disconnected slaves

    Redis not replicating for all slaves. Consider reviewing the redis replication status.[copy]

    ```yaml
      - alert: RedisDisconnectedSlaves
        expr: count without (instance, job) (redis_connected_slaves) - sum without (instance, job) (redis_connected_slaves) - 1 > 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Redis disconnected slaves (instance {{ $labels.instance }})
          description: "Redis not replicating for all slaves. Consider reviewing the redis replication status.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-redis-1-5) 2.5.5. Redis replication broken

    Redis instance lost a slave[copy]

    ```yaml
      - alert: RedisReplicationBroken
        expr: delta(redis_connected_slaves[1m]) < 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Redis replication broken (instance {{ $labels.instance }})
          description: "Redis instance lost a slave\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-redis-1-6) 2.5.6. Redis cluster flapping

    Changes have been detected in Redis replica connection. This can occur when replica nodes lose connection to the master and reconnect (a.k.a flapping).[copy]

    ```yaml
      - alert: RedisClusterFlapping
        expr: changes(redis_connected_slaves[1m]) > 1
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Redis cluster flapping (instance {{ $labels.instance }})
          description: "Changes have been detected in Redis replica connection. This can occur when replica nodes lose connection to the master and reconnect (a.k.a flapping).\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-redis-1-7) 2.5.7. Redis missing backup

    Redis has not been backuped for 24 hours[copy]

    ```yaml
      - alert: RedisMissingBackup
        expr: time() - redis_rdb_last_save_timestamp_seconds > 60 * 60 * 24
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Redis missing backup (instance {{ $labels.instance }})
          description: "Redis has not been backuped for 24 hours\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-redis-1-8) 2.5.8. Redis out of system memory

    Redis is running out of system memory (> 90%)[copy]

    ```yaml
      # The exporter must be started with --include-system-metrics flag or REDIS_EXPORTER_INCL_SYSTEM_METRICS=true environment variable.
      - alert: RedisOutOfSystemMemory
        expr: redis_memory_used_bytes / redis_total_system_memory_bytes * 100 > 90
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Redis out of system memory (instance {{ $labels.instance }})
          description: "Redis is running out of system memory (> 90%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-redis-1-9) 2.5.9. Redis out of configured maxmemory

    Redis is running out of configured maxmemory (> 90%)[copy]

    ```yaml
      - alert: RedisOutOfConfiguredMaxmemory
        expr: redis_memory_used_bytes / redis_memory_max_bytes * 100 > 90
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Redis out of configured maxmemory (instance {{ $labels.instance }})
          description: "Redis is running out of configured maxmemory (> 90%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-redis-1-10) 2.5.10. Redis too many connections

    Redis instance has too many connections[copy]

    ```yaml
      - alert: RedisTooManyConnections
        expr: redis_connected_clients > 100
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Redis too many connections (instance {{ $labels.instance }})
          description: "Redis instance has too many connections\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-redis-1-11) 2.5.11. Redis not enough connections

    Redis instance should have more connections (> 5)[copy]

    ```yaml
      - alert: RedisNotEnoughConnections
        expr: redis_connected_clients < 5
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Redis not enough connections (instance {{ $labels.instance }})
          description: "Redis instance should have more connections (> 5)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-redis-1-12) 2.5.12. Redis rejected connections

    Some connections to Redis has been rejected[copy]

    ```yaml
      - alert: RedisRejectedConnections
        expr: increase(redis_rejected_connections_total[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Redis rejected connections (instance {{ $labels.instance }})
          description: "Some connections to Redis has been rejected\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#mongodb-1) 2.6.1. MongoDB : [percona/mongodb_exporter ](https://github.com/percona/mongodb_exporter)(7 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-1-1) 2.6.1.1. MongoDB Down

    MongoDB instance is down[copy]

    ```yaml
      - alert: MongodbDown
        expr: mongodb_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: MongoDB Down (instance {{ $labels.instance }})
          description: "MongoDB instance is down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-1-2) 2.6.1.2. MongoDB replication lag

    Mongodb replication lag is more than 10s[copy]

    ```yaml
      - alert: MongodbReplicationLag
        expr: mongodb_mongod_replset_member_optime_date{state="PRIMARY"} - ON (set) mongodb_mongod_replset_member_optime_date{state="SECONDARY"} > 10
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: MongoDB replication lag (instance {{ $labels.instance }})
          description: "Mongodb replication lag is more than 10s\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-1-3) 2.6.1.3. MongoDB replication headroom

    MongoDB replication headroom is <= 0[copy]

    ```yaml
      - alert: MongodbReplicationHeadroom
        expr: (avg(mongodb_mongod_replset_oplog_head_timestamp - mongodb_mongod_replset_oplog_tail_timestamp) - (avg(mongodb_mongod_replset_member_optime_date{state="PRIMARY"}) - avg(mongodb_mongod_replset_member_optime_date{state="SECONDARY"}))) <= 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: MongoDB replication headroom (instance {{ $labels.instance }})
          description: "MongoDB replication headroom is <= 0\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-1-4) 2.6.1.4. MongoDB number cursors open

    Too many cursors opened by MongoDB for clients (> 10k)[copy]

    ```yaml
      - alert: MongodbNumberCursorsOpen
        expr: mongodb_mongod_metrics_cursor_open{state="total"} > 10 * 1000
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: MongoDB number cursors open (instance {{ $labels.instance }})
          description: "Too many cursors opened by MongoDB for clients (> 10k)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-1-5) 2.6.1.5. MongoDB cursors timeouts

    Too many cursors are timing out[copy]

    ```yaml
      - alert: MongodbCursorsTimeouts
        expr: increase(mongodb_mongod_metrics_cursor_timed_out_total[1m]) > 100
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: MongoDB cursors timeouts (instance {{ $labels.instance }})
          description: "Too many cursors are timing out\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-1-6) 2.6.1.6. MongoDB too many connections

    Too many connections (> 80%)[copy]

    ```yaml
      - alert: MongodbTooManyConnections
        expr: avg by(instance) (rate(mongodb_connections{state="current"}[1m])) / avg by(instance) (sum (mongodb_connections) by (instance)) * 100 > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: MongoDB too many connections (instance {{ $labels.instance }})
          description: "Too many connections (> 80%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-1-7) 2.6.1.7. MongoDB virtual memory usage

    High memory usage[copy]

    ```yaml
      - alert: MongodbVirtualMemoryUsage
        expr: (sum(mongodb_memory{type="virtual"}) BY (instance) / sum(mongodb_memory{type="mapped"}) BY (instance)) > 3
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: MongoDB virtual memory usage (instance {{ $labels.instance }})
          description: "High memory usage\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#mongodb-2) 2.6.2. MongoDB : [dcu/mongodb_exporter ](https://github.com/dcu/mongodb_exporter)(10 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-2-1) 2.6.2.1. MongoDB replication lag

    Mongodb replication lag is more than 10s[copy]

    ```yaml
      - alert: MongodbReplicationLag
        expr: avg(mongodb_replset_member_optime_date{state="PRIMARY"}) - avg(mongodb_replset_member_optime_date{state="SECONDARY"}) > 10
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: MongoDB replication lag (instance {{ $labels.instance }})
          description: "Mongodb replication lag is more than 10s\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-2-2) 2.6.2.2. MongoDB replication Status 3

    MongoDB Replication set member either perform startup self-checks, or transition from completing a rollback or resync[copy]

    ```yaml
      - alert: MongodbReplicationStatus3
        expr: mongodb_replset_member_state == 3
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: MongoDB replication Status 3 (instance {{ $labels.instance }})
          description: "MongoDB Replication set member either perform startup self-checks, or transition from completing a rollback or resync\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-2-3) 2.6.2.3. MongoDB replication Status 6

    MongoDB Replication set member as seen from another member of the set, is not yet known[copy]

    ```yaml
      - alert: MongodbReplicationStatus6
        expr: mongodb_replset_member_state == 6
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: MongoDB replication Status 6 (instance {{ $labels.instance }})
          description: "MongoDB Replication set member as seen from another member of the set, is not yet known\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-2-4) 2.6.2.4. MongoDB replication Status 8

    MongoDB Replication set member as seen from another member of the set, is unreachable[copy]

    ```yaml
      - alert: MongodbReplicationStatus8
        expr: mongodb_replset_member_state == 8
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: MongoDB replication Status 8 (instance {{ $labels.instance }})
          description: "MongoDB Replication set member as seen from another member of the set, is unreachable\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-2-5) 2.6.2.5. MongoDB replication Status 9

    MongoDB Replication set member is actively performing a rollback. Data is not available for reads[copy]

    ```yaml
      - alert: MongodbReplicationStatus9
        expr: mongodb_replset_member_state == 9
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: MongoDB replication Status 9 (instance {{ $labels.instance }})
          description: "MongoDB Replication set member is actively performing a rollback. Data is not available for reads\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-2-6) 2.6.2.6. MongoDB replication Status 10

    MongoDB Replication set member was once in a replica set but was subsequently removed[copy]

    ```yaml
      - alert: MongodbReplicationStatus10
        expr: mongodb_replset_member_state == 10
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: MongoDB replication Status 10 (instance {{ $labels.instance }})
          description: "MongoDB Replication set member was once in a replica set but was subsequently removed\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-2-7) 2.6.2.7. MongoDB number cursors open

    Too many cursors opened by MongoDB for clients (> 10k)[copy]

    ```
      - alert: MongodbNumberCursorsOpen
        expr: mongodb_metrics_cursor_open{state="total_open"} > 10000
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: MongoDB number cursors open (instance {{ $labels.instance }})
          description: "Too many cursors opened by MongoDB for clients (> 10k)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-2-8) 2.6.2.8. MongoDB cursors timeouts

    Too many cursors are timing out[copy]

    ```
      - alert: MongodbCursorsTimeouts
        expr: increase(mongodb_metrics_cursor_timed_out_total[1m]) > 100
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: MongoDB cursors timeouts (instance {{ $labels.instance }})
          description: "Too many cursors are timing out\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-2-9) 2.6.2.9. MongoDB too many connections

    Too many connections (> 80%)[copy]

    ```
      - alert: MongodbTooManyConnections
        expr: avg by(instance) (rate(mongodb_connections{state="current"}[1m])) / avg by(instance) (sum (mongodb_connections) by (instance)) * 100 > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: MongoDB too many connections (instance {{ $labels.instance }})
          description: "Too many connections (> 80%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-mongodb-2-10) 2.6.2.10. MongoDB virtual memory usage

    High memory usage[copy]

    ```
      - alert: MongodbVirtualMemoryUsage
        expr: (sum(mongodb_memory{type="virtual"}) BY (instance) / sum(mongodb_memory{type="mapped"}) BY (instance)) > 3
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: MongoDB virtual memory usage (instance {{ $labels.instance }})
          description: "High memory usage\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#rabbitmq-1) 2.7.1. RabbitMQ : [rabbitmq/rabbitmq-prometheus ](https://github.com/rabbitmq/rabbitmq-prometheus)(9 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-1-1) 2.7.1.1. Rabbitmq node down

    Less than 3 nodes running in RabbitMQ cluster[copy]

    ```
      - alert: RabbitmqNodeDown
        expr: sum(rabbitmq_build_info) < 3
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Rabbitmq node down (instance {{ $labels.instance }})
          description: "Less than 3 nodes running in RabbitMQ cluster\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-1-2) 2.7.1.2. Rabbitmq node not distributed

    Distribution link state is not 'up'[copy]

    ```
      - alert: RabbitmqNodeNotDistributed
        expr: erlang_vm_dist_node_state < 3
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Rabbitmq node not distributed (instance {{ $labels.instance }})
          description: "Distribution link state is not 'up'\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-1-3) 2.7.1.3. Rabbitmq instances different versions

    Running different version of Rabbitmq in the same cluster, can lead to failure.[copy]

    ```
      - alert: RabbitmqInstancesDifferentVersions
        expr: count(count(rabbitmq_build_info) by (rabbitmq_version)) > 1
        for: 1h
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq instances different versions (instance {{ $labels.instance }})
          description: "Running different version of Rabbitmq in the same cluster, can lead to failure.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-1-4) 2.7.1.4. Rabbitmq memory high

    A node use more than 90% of allocated RAM[copy]

    ```
      - alert: RabbitmqMemoryHigh
        expr: rabbitmq_process_resident_memory_bytes / rabbitmq_resident_memory_limit_bytes * 100 > 90
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq memory high (instance {{ $labels.instance }})
          description: "A node use more than 90% of allocated RAM\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-1-5) 2.7.1.5. Rabbitmq file descriptors usage

    A node use more than 90% of file descriptors[copy]

    ```
      - alert: RabbitmqFileDescriptorsUsage
        expr: rabbitmq_process_open_fds / rabbitmq_process_max_fds * 100 > 90
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq file descriptors usage (instance {{ $labels.instance }})
          description: "A node use more than 90% of file descriptors\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-1-6) 2.7.1.6. Rabbitmq too many unack messages

    Too many unacknowledged messages[copy]

    ```
      - alert: RabbitmqTooManyUnackMessages
        expr: sum(rabbitmq_queue_messages_unacked) BY (queue) > 1000
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq too many unack messages (instance {{ $labels.instance }})
          description: "Too many unacknowledged messages\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-1-7) 2.7.1.7. Rabbitmq too many connections

    The total connections of a node is too high[copy]

    ```
      - alert: RabbitmqTooManyConnections
        expr: rabbitmq_connections > 1000
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq too many connections (instance {{ $labels.instance }})
          description: "The total connections of a node is too high\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-1-8) 2.7.1.8. Rabbitmq no queue consumer

    A queue has less than 1 consumer[copy]

    ```
      - alert: RabbitmqNoQueueConsumer
        expr: rabbitmq_queue_consumers < 1
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq no queue consumer (instance {{ $labels.instance }})
          description: "A queue has less than 1 consumer\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-1-9) 2.7.1.9. Rabbitmq unroutable messages

    A queue has unroutable messages[copy]

    ```
      - alert: RabbitmqUnroutableMessages
        expr: increase(rabbitmq_channel_messages_unroutable_returned_total[1m]) > 0 or increase(rabbitmq_channel_messages_unroutable_dropped_total[1m]) > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq unroutable messages (instance {{ $labels.instance }})
          description: "A queue has unroutable messages\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#rabbitmq-2) 2.7.2. RabbitMQ : [kbudde/rabbitmq-exporter ](https://github.com/kbudde/rabbitmq_exporter)(11 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-2-1) 2.7.2.1. Rabbitmq down

    RabbitMQ node down[copy]

    ```
      - alert: RabbitmqDown
        expr: rabbitmq_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Rabbitmq down (instance {{ $labels.instance }})
          description: "RabbitMQ node down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-2-2) 2.7.2.2. Rabbitmq cluster down

    Less than 3 nodes running in RabbitMQ cluster[copy]

    ```
      - alert: RabbitmqClusterDown
        expr: sum(rabbitmq_running) < 3
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Rabbitmq cluster down (instance {{ $labels.instance }})
          description: "Less than 3 nodes running in RabbitMQ cluster\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-2-3) 2.7.2.3. Rabbitmq cluster partition

    Cluster partition[copy]

    ```
      - alert: RabbitmqClusterPartition
        expr: rabbitmq_partitions > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Rabbitmq cluster partition (instance {{ $labels.instance }})
          description: "Cluster partition\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-2-4) 2.7.2.4. Rabbitmq out of memory

    Memory available for RabbmitMQ is low (< 10%)[copy]

    ```
      - alert: RabbitmqOutOfMemory
        expr: rabbitmq_node_mem_used / rabbitmq_node_mem_limit * 100 > 90
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq out of memory (instance {{ $labels.instance }})
          description: "Memory available for RabbmitMQ is low (< 10%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-2-5) 2.7.2.5. Rabbitmq too many connections

    RabbitMQ instance has too many connections (> 1000)[copy]

    ```
      - alert: RabbitmqTooManyConnections
        expr: rabbitmq_connectionsTotal > 1000
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq too many connections (instance {{ $labels.instance }})
          description: "RabbitMQ instance has too many connections (> 1000)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-2-6) 2.7.2.6. Rabbitmq dead letter queue filling up

    Dead letter queue is filling up (> 10 msgs)[copy]

    ```
      # Indicate the queue name in dedicated label.
      - alert: RabbitmqDeadLetterQueueFillingUp
        expr: rabbitmq_queue_messages{queue="my-dead-letter-queue"} > 10
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq dead letter queue filling up (instance {{ $labels.instance }})
          description: "Dead letter queue is filling up (> 10 msgs)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-2-7) 2.7.2.7. Rabbitmq too many messages in queue

    Queue is filling up (> 1000 msgs)[copy]

    ```
      # Indicate the queue name in dedicated label.
      - alert: RabbitmqTooManyMessagesInQueue
        expr: rabbitmq_queue_messages_ready{queue="my-queue"} > 1000
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq too many messages in queue (instance {{ $labels.instance }})
          description: "Queue is filling up (> 1000 msgs)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-2-8) 2.7.2.8. Rabbitmq slow queue consuming

    Queue messages are consumed slowly (> 60s)[copy]

    ```
      # Indicate the queue name in dedicated label.
      - alert: RabbitmqSlowQueueConsuming
        expr: time() - rabbitmq_queue_head_message_timestamp{queue="my-queue"} > 60
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq slow queue consuming (instance {{ $labels.instance }})
          description: "Queue messages are consumed slowly (> 60s)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-2-9) 2.7.2.9. Rabbitmq no consumer

    Queue has no consumer[copy]

    ```
      - alert: RabbitmqNoConsumer
        expr: rabbitmq_queue_consumers == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Rabbitmq no consumer (instance {{ $labels.instance }})
          description: "Queue has no consumer\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-2-10) 2.7.2.10. Rabbitmq too many consumers

    Queue should have only 1 consumer[copy]

    ```
      # Indicate the queue name in dedicated label.
      - alert: RabbitmqTooManyConsumers
        expr: rabbitmq_queue_consumers{queue="my-queue"} > 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Rabbitmq too many consumers (instance {{ $labels.instance }})
          description: "Queue should have only 1 consumer\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-rabbitmq-2-11) 2.7.2.11. Rabbitmq unactive exchange

    Exchange receive less than 5 msgs per second[copy]

    ```
      # Indicate the exchange name in dedicated label.
      - alert: RabbitmqUnactiveExchange
        expr: rate(rabbitmq_exchange_messages_published_in_total{exchange="my-exchange"}[1m]) < 5
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Rabbitmq unactive exchange (instance {{ $labels.instance }})
          description: "Exchange receive less than 5 msgs per second\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#elasticsearch-1) 2.8. Elasticsearch : [justwatchcom/elasticsearch_exporter ](https://github.com/justwatchcom/elasticsearch_exporter)(15 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-1) 2.8.1. Elasticsearch Heap Usage Too High

    The heap usage is over 90%[copy]

    ```
      - alert: ElasticsearchHeapUsageTooHigh
        expr: (elasticsearch_jvm_memory_used_bytes{area="heap"} / elasticsearch_jvm_memory_max_bytes{area="heap"}) * 100 > 90
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Elasticsearch Heap Usage Too High (instance {{ $labels.instance }})
          description: "The heap usage is over 90%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-2) 2.8.2. Elasticsearch Heap Usage warning

    The heap usage is over 80%[copy]

    ```
      - alert: ElasticsearchHeapUsageWarning
        expr: (elasticsearch_jvm_memory_used_bytes{area="heap"} / elasticsearch_jvm_memory_max_bytes{area="heap"}) * 100 > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Elasticsearch Heap Usage warning (instance {{ $labels.instance }})
          description: "The heap usage is over 80%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-3) 2.8.3. Elasticsearch disk out of space

    The disk usage is over 90%[copy]

    ```
      - alert: ElasticsearchDiskOutOfSpace
        expr: elasticsearch_filesystem_data_available_bytes / elasticsearch_filesystem_data_size_bytes * 100 < 10
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Elasticsearch disk out of space (instance {{ $labels.instance }})
          description: "The disk usage is over 90%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-4) 2.8.4. Elasticsearch disk space low

    The disk usage is over 80%[copy]

    ```
      - alert: ElasticsearchDiskSpaceLow
        expr: elasticsearch_filesystem_data_available_bytes / elasticsearch_filesystem_data_size_bytes * 100 < 20
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Elasticsearch disk space low (instance {{ $labels.instance }})
          description: "The disk usage is over 80%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-5) 2.8.5. Elasticsearch Cluster Red

    Elastic Cluster Red status[copy]

    ```
      - alert: ElasticsearchClusterRed
        expr: elasticsearch_cluster_health_status{color="red"} == 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Elasticsearch Cluster Red (instance {{ $labels.instance }})
          description: "Elastic Cluster Red status\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-6) 2.8.6. Elasticsearch Cluster Yellow

    Elastic Cluster Yellow status[copy]

    ```
      - alert: ElasticsearchClusterYellow
        expr: elasticsearch_cluster_health_status{color="yellow"} == 1
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Elasticsearch Cluster Yellow (instance {{ $labels.instance }})
          description: "Elastic Cluster Yellow status\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-7) 2.8.7. Elasticsearch Healthy Nodes

    Missing node in Elasticsearch cluster[copy]

    ```
      - alert: ElasticsearchHealthyNodes
        expr: elasticsearch_cluster_health_number_of_nodes < 3
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Elasticsearch Healthy Nodes (instance {{ $labels.instance }})
          description: "Missing node in Elasticsearch cluster\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-8) 2.8.8. Elasticsearch Healthy Data Nodes

    Missing data node in Elasticsearch cluster[copy]

    ```
      - alert: ElasticsearchHealthyDataNodes
        expr: elasticsearch_cluster_health_number_of_data_nodes < 3
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Elasticsearch Healthy Data Nodes (instance {{ $labels.instance }})
          description: "Missing data node in Elasticsearch cluster\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-9) 2.8.9. Elasticsearch relocating shards

    Elasticsearch is relocating shards[copy]

    ```
      - alert: ElasticsearchRelocatingShards
        expr: elasticsearch_cluster_health_relocating_shards > 0
        for: 0m
        labels:
          severity: info
        annotations:
          summary: Elasticsearch relocating shards (instance {{ $labels.instance }})
          description: "Elasticsearch is relocating shards\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-10) 2.8.10. Elasticsearch relocating shards too long

    Elasticsearch has been relocating shards for 15min[copy]

    ```
      - alert: ElasticsearchRelocatingShardsTooLong
        expr: elasticsearch_cluster_health_relocating_shards > 0
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: Elasticsearch relocating shards too long (instance {{ $labels.instance }})
          description: "Elasticsearch has been relocating shards for 15min\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-11) 2.8.11. Elasticsearch initializing shards

    Elasticsearch is initializing shards[copy]

    ```
      - alert: ElasticsearchInitializingShards
        expr: elasticsearch_cluster_health_initializing_shards > 0
        for: 0m
        labels:
          severity: info
        annotations:
          summary: Elasticsearch initializing shards (instance {{ $labels.instance }})
          description: "Elasticsearch is initializing shards\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-12) 2.8.12. Elasticsearch initializing shards too long

    Elasticsearch has been initializing shards for 15 min[copy]

    ```
      - alert: ElasticsearchInitializingShardsTooLong
        expr: elasticsearch_cluster_health_initializing_shards > 0
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: Elasticsearch initializing shards too long (instance {{ $labels.instance }})
          description: "Elasticsearch has been initializing shards for 15 min\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-13) 2.8.13. Elasticsearch unassigned shards

    Elasticsearch has unassigned shards[copy]

    ```
      - alert: ElasticsearchUnassignedShards
        expr: elasticsearch_cluster_health_unassigned_shards > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Elasticsearch unassigned shards (instance {{ $labels.instance }})
          description: "Elasticsearch has unassigned shards\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-14) 2.8.14. Elasticsearch pending tasks

    Elasticsearch has pending tasks. Cluster works slowly.[copy]

    ```
      - alert: ElasticsearchPendingTasks
        expr: elasticsearch_cluster_health_number_of_pending_tasks > 0
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: Elasticsearch pending tasks (instance {{ $labels.instance }})
          description: "Elasticsearch has pending tasks. Cluster works slowly.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-elasticsearch-1-15) 2.8.15. Elasticsearch no new documents

    No new documents for 10 min![copy]

    ```
      - alert: ElasticsearchNoNewDocuments
        expr: increase(elasticsearch_indices_docs{es_data_node="true"}[10m]) < 1
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Elasticsearch no new documents (instance {{ $labels.instance }})
          description: "No new documents for 10 min!\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#cassandra-1) 2.9.1. Cassandra : [instaclustr/cassandra-exporter ](https://github.com/instaclustr/cassandra-exporter)(12 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-1-1) 2.9.1.1. Cassandra Node is unavailable

    Cassandra Node is unavailable - {{ $labels.cassandra_cluster }} {{ $labels.exported_endpoint }}[copy]

    ```
      - alert: CassandraNodeIsUnavailable
        expr: sum(cassandra_endpoint_active) by (cassandra_cluster,instance,exported_endpoint) < 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cassandra Node is unavailable (instance {{ $labels.instance }})
          description: "Cassandra Node is unavailable - {{ $labels.cassandra_cluster }} {{ $labels.exported_endpoint }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-1-2) 2.9.1.2. Cassandra many compaction tasks are pending

    Many Cassandra compaction tasks are pending - {{ $labels.cassandra_cluster }}[copy]

    ```
      - alert: CassandraManyCompactionTasksArePending
        expr: cassandra_table_estimated_pending_compactions > 100
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Cassandra many compaction tasks are pending (instance {{ $labels.instance }})
          description: "Many Cassandra compaction tasks are pending - {{ $labels.cassandra_cluster }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-1-3) 2.9.1.3. Cassandra commitlog pending tasks

    Cassandra commitlog pending tasks - {{ $labels.cassandra_cluster }}[copy]

    ```
      - alert: CassandraCommitlogPendingTasks
        expr: cassandra_commit_log_pending_tasks > 15
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Cassandra commitlog pending tasks (instance {{ $labels.instance }})
          description: "Cassandra commitlog pending tasks - {{ $labels.cassandra_cluster }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-1-4) 2.9.1.4. Cassandra compaction executor blocked tasks

    Some Cassandra compaction executor tasks are blocked - {{ $labels.cassandra_cluster }}[copy]

    ```
      - alert: CassandraCompactionExecutorBlockedTasks
        expr: cassandra_thread_pool_blocked_tasks{pool="CompactionExecutor"} > 15
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Cassandra compaction executor blocked tasks (instance {{ $labels.instance }})
          description: "Some Cassandra compaction executor tasks are blocked - {{ $labels.cassandra_cluster }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-1-5) 2.9.1.5. Cassandra flush writer blocked tasks

    Some Cassandra flush writer tasks are blocked - {{ $labels.cassandra_cluster }}[copy]

    ```
      - alert: CassandraFlushWriterBlockedTasks
        expr: cassandra_thread_pool_blocked_tasks{pool="MemtableFlushWriter"} > 15
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Cassandra flush writer blocked tasks (instance {{ $labels.instance }})
          description: "Some Cassandra flush writer tasks are blocked - {{ $labels.cassandra_cluster }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-1-6) 2.9.1.6. Cassandra connection timeouts total

    Some connection between nodes are ending in timeout - {{ $labels.cassandra_cluster }}[copy]

    ```
      - alert: CassandraConnectionTimeoutsTotal
        expr: avg(cassandra_client_request_timeouts_total) by (cassandra_cluster,instance) > 5
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Cassandra connection timeouts total (instance {{ $labels.instance }})
          description: "Some connection between nodes are ending in timeout - {{ $labels.cassandra_cluster }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-1-7) 2.9.1.7. Cassandra storage exceptions

    Something is going wrong with cassandra storage - {{ $labels.cassandra_cluster }}[copy]

    ```
      - alert: CassandraStorageExceptions
        expr: changes(cassandra_storage_exceptions_total[1m]) > 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cassandra storage exceptions (instance {{ $labels.instance }})
          description: "Something is going wrong with cassandra storage - {{ $labels.cassandra_cluster }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-1-8) 2.9.1.8. Cassandra tombstone dump

    Cassandra tombstone dump - {{ $labels.cassandra_cluster }}[copy]

    ```
      - alert: CassandraTombstoneDump
        expr: avg(cassandra_table_tombstones_scanned{quantile="0.99"}) by (instance,cassandra_cluster,keyspace) > 100
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Cassandra tombstone dump (instance {{ $labels.instance }})
          description: "Cassandra tombstone dump - {{ $labels.cassandra_cluster }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-1-9) 2.9.1.9. Cassandra client request unvailable write

    Some Cassandra client requests are unvailable to write - {{ $labels.cassandra_cluster }}[copy]

    ```
      - alert: CassandraClientRequestUnvailableWrite
        expr: changes(cassandra_client_request_unavailable_exceptions_total{operation="write"}[1m]) > 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Cassandra client request unvailable write (instance {{ $labels.instance }})
          description: "Some Cassandra client requests are unvailable to write - {{ $labels.cassandra_cluster }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-1-10) 2.9.1.10. Cassandra client request unvailable read

    Some Cassandra client requests are unvailable to read - {{ $labels.cassandra_cluster }}[copy]

    ```
      - alert: CassandraClientRequestUnvailableRead
        expr: changes(cassandra_client_request_unavailable_exceptions_total{operation="read"}[1m]) > 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Cassandra client request unvailable read (instance {{ $labels.instance }})
          description: "Some Cassandra client requests are unvailable to read - {{ $labels.cassandra_cluster }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-1-11) 2.9.1.11. Cassandra client request write failure

    Read failures have occurred, ensure there are not too many unavailable nodes - {{ $labels.cassandra_cluster }}[copy]

    ```
      - alert: CassandraClientRequestWriteFailure
        expr: increase(cassandra_client_request_failures_total{operation="write"}[1m]) > 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Cassandra client request write failure (instance {{ $labels.instance }})
          description: "Read failures have occurred, ensure there are not too many unavailable nodes - {{ $labels.cassandra_cluster }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-1-12) 2.9.1.12. Cassandra client request read failure

    Read failures have occurred, ensure there are not too many unavailable nodes - {{ $labels.cassandra_cluster }}[copy]

    ```
      - alert: CassandraClientRequestReadFailure
        expr: increase(cassandra_client_request_failures_total{operation="read"}[1m]) > 0
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Cassandra client request read failure (instance {{ $labels.instance }})
          description: "Read failures have occurred, ensure there are not too many unavailable nodes - {{ $labels.cassandra_cluster }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#cassandra-2) 2.9.2. Cassandra : [criteo/cassandra_exporter ](https://github.com/criteo/cassandra_exporter)(18 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-1) 2.9.2.1. Cassandra hints count

    Cassandra hints count has changed on {{ $labels.instance }} some nodes may go down[copy]

    ```
      - alert: CassandraHintsCount
        expr: changes(cassandra_stats{name="org:apache:cassandra:metrics:storage:totalhints:count"}[1m]) > 3
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cassandra hints count (instance {{ $labels.instance }})
          description: "Cassandra hints count has changed on {{ $labels.instance }} some nodes may go down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-2) 2.9.2.2. Cassandra compaction task pending

    Many Cassandra compaction tasks are pending. You might need to increase I/O capacity by adding nodes to the cluster.[copy]

    ```
      - alert: CassandraCompactionTaskPending
        expr: avg_over_time(cassandra_stats{name="org:apache:cassandra:metrics:compaction:pendingtasks:value"}[1m]) > 100
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Cassandra compaction task pending (instance {{ $labels.instance }})
          description: "Many Cassandra compaction tasks are pending. You might need to increase I/O capacity by adding nodes to the cluster.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-3) 2.9.2.3. Cassandra viewwrite latency

    High viewwrite latency on {{ $labels.instance }} cassandra node[copy]

    ```
      - alert: CassandraViewwriteLatency
        expr: cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:viewwrite:viewwritelatency:99thpercentile",service="cas"} > 100000
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Cassandra viewwrite latency (instance {{ $labels.instance }})
          description: "High viewwrite latency on {{ $labels.instance }} cassandra node\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-4) 2.9.2.4. Cassandra bad hacker

    Increase of Cassandra authentication failures[copy]

    ```
      - alert: CassandraBadHacker
        expr: rate(cassandra_stats{name="org:apache:cassandra:metrics:client:authfailure:count"}[1m]) > 5
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Cassandra bad hacker (instance {{ $labels.instance }})
          description: "Increase of Cassandra authentication failures\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-5) 2.9.2.5. Cassandra node down

    Cassandra node down[copy]

    ```
      - alert: CassandraNodeDown
        expr: sum(cassandra_stats{name="org:apache:cassandra:net:failuredetector:downendpointcount"}) by (service,group,cluster,env) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cassandra node down (instance {{ $labels.instance }})
          description: "Cassandra node down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-6) 2.9.2.6. Cassandra commitlog pending tasks

    Unexpected number of Cassandra commitlog pending tasks[copy]

    ```
      - alert: CassandraCommitlogPendingTasks
        expr: cassandra_stats{name="org:apache:cassandra:metrics:commitlog:pendingtasks:value"} > 15
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Cassandra commitlog pending tasks (instance {{ $labels.instance }})
          description: "Unexpected number of Cassandra commitlog pending tasks\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-7) 2.9.2.7. Cassandra compaction executor blocked tasks

    Some Cassandra compaction executor tasks are blocked[copy]

    ```
      - alert: CassandraCompactionExecutorBlockedTasks
        expr: cassandra_stats{name="org:apache:cassandra:metrics:threadpools:internal:compactionexecutor:currentlyblockedtasks:count"} > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Cassandra compaction executor blocked tasks (instance {{ $labels.instance }})
          description: "Some Cassandra compaction executor tasks are blocked\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-8) 2.9.2.8. Cassandra flush writer blocked tasks

    Some Cassandra flush writer tasks are blocked[copy]

    ```
      - alert: CassandraFlushWriterBlockedTasks
        expr: cassandra_stats{name="org:apache:cassandra:metrics:threadpools:internal:memtableflushwriter:currentlyblockedtasks:count"} > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Cassandra flush writer blocked tasks (instance {{ $labels.instance }})
          description: "Some Cassandra flush writer tasks are blocked\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-9) 2.9.2.9. Cassandra repair pending tasks

    Some Cassandra repair tasks are pending[copy]

    ```
      - alert: CassandraRepairPendingTasks
        expr: cassandra_stats{name="org:apache:cassandra:metrics:threadpools:internal:antientropystage:pendingtasks:value"} > 2
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Cassandra repair pending tasks (instance {{ $labels.instance }})
          description: "Some Cassandra repair tasks are pending\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-10) 2.9.2.10. Cassandra repair blocked tasks

    Some Cassandra repair tasks are blocked[copy]

    ```
      - alert: CassandraRepairBlockedTasks
        expr: cassandra_stats{name="org:apache:cassandra:metrics:threadpools:internal:antientropystage:currentlyblockedtasks:count"} > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Cassandra repair blocked tasks (instance {{ $labels.instance }})
          description: "Some Cassandra repair tasks are blocked\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-11) 2.9.2.11. Cassandra connection timeouts total

    Some connection between nodes are ending in timeout[copy]

    ```
      - alert: CassandraConnectionTimeoutsTotal
        expr: rate(cassandra_stats{name="org:apache:cassandra:metrics:connection:totaltimeouts:count"}[1m]) > 5
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Cassandra connection timeouts total (instance {{ $labels.instance }})
          description: "Some connection between nodes are ending in timeout\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-12) 2.9.2.12. Cassandra storage exceptions

    Something is going wrong with cassandra storage[copy]

    ```
      - alert: CassandraStorageExceptions
        expr: changes(cassandra_stats{name="org:apache:cassandra:metrics:storage:exceptions:count"}[1m]) > 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cassandra storage exceptions (instance {{ $labels.instance }})
          description: "Something is going wrong with cassandra storage\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-13) 2.9.2.13. Cassandra tombstone dump

    Too much tombstones scanned in queries[copy]

    ```
      - alert: CassandraTombstoneDump
        expr: cassandra_stats{name="org:apache:cassandra:metrics:table:tombstonescannedhistogram:99thpercentile"} > 1000
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cassandra tombstone dump (instance {{ $labels.instance }})
          description: "Too much tombstones scanned in queries\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-14) 2.9.2.14. Cassandra client request unvailable write

    Write failures have occurred because too many nodes are unavailable[copy]

    ```
      - alert: CassandraClientRequestUnvailableWrite
        expr: changes(cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:write:unavailables:count"}[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cassandra client request unvailable write (instance {{ $labels.instance }})
          description: "Write failures have occurred because too many nodes are unavailable\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-15) 2.9.2.15. Cassandra client request unvailable read

    Read failures have occurred because too many nodes are unavailable[copy]

    ```
      - alert: CassandraClientRequestUnvailableRead
        expr: changes(cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:read:unavailables:count"}[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cassandra client request unvailable read (instance {{ $labels.instance }})
          description: "Read failures have occurred because too many nodes are unavailable\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-16) 2.9.2.16. Cassandra client request write failure

    A lot of write failures encountered. A write failure is a non-timeout exception encountered during a write request. Examine the reason map to find to the root cause. The most common cause for this type of error is when batch sizes are too large.[copy]

    ```
      - alert: CassandraClientRequestWriteFailure
        expr: increase(cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:write:failures:oneminuterate"}[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cassandra client request write failure (instance {{ $labels.instance }})
          description: "A lot of write failures encountered. A write failure is a non-timeout exception encountered during a write request. Examine the reason map to find to the root cause. The most common cause for this type of error is when batch sizes are too large.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-17) 2.9.2.17. Cassandra client request read failure

    A lot of read failures encountered. A read failure is a non-timeout exception encountered during a read request. Examine the reason map to find to the root cause. The most common cause for this type of error is when batch sizes are too large.[copy]

    ```
      - alert: CassandraClientRequestReadFailure
        expr: increase(cassandra_stats{name="org:apache:cassandra:metrics:clientrequest:read:failures:oneminuterate"}[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cassandra client request read failure (instance {{ $labels.instance }})
          description: "A lot of read failures encountered. A read failure is a non-timeout exception encountered during a read request. Examine the reason map to find to the root cause. The most common cause for this type of error is when batch sizes are too large.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cassandra-2-18) 2.9.2.18. Cassandra cache hit rate key cache

    Key cache hit rate is below 85%[copy]

    ```
      - alert: CassandraCacheHitRateKeyCache
        expr: cassandra_stats{name="org:apache:cassandra:metrics:cache:keycache:hitrate:value"} < .85
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Cassandra cache hit rate key cache (instance {{ $labels.instance }})
          description: "Key cache hit rate is below 85%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#zookeeper-1) 2.10.1. Zookeeper : [cloudflare/kafka_zookeeper_exporter](https://github.com/cloudflare/kafka_zookeeper_exporter)

  ```
    // @TODO: Please contribute => https://github.com/samber/awesome-prometheus-alerts 👋
    
  ```


------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#zookeeper-2) 2.10.2. Zookeeper : [dabealu/zookeeper-exporter ](https://github.com/dabealu/zookeeper-exporter)(4 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-zookeeper-2-1) 2.10.2.1. Zookeeper Down

    Zookeeper down on instance {{ $labels.instance }}[copy]

    ```
      - alert: ZookeeperDown
        expr: zk_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Zookeeper Down (instance {{ $labels.instance }})
          description: "Zookeeper down on instance {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-zookeeper-2-2) 2.10.2.2. Zookeeper missing leader

    Zookeeper cluster has no node marked as leader[copy]

    ```
      - alert: ZookeeperMissingLeader
        expr: sum(zk_server_leader) == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Zookeeper missing leader (instance {{ $labels.instance }})
          description: "Zookeeper cluster has no node marked as leader\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-zookeeper-2-3) 2.10.2.3. Zookeeper Too Many Leaders

    Zookeeper cluster has too many nodes marked as leader[copy]

    ```
      - alert: ZookeeperTooManyLeaders
        expr: sum(zk_server_leader) > 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Zookeeper Too Many Leaders (instance {{ $labels.instance }})
          description: "Zookeeper cluster has too many nodes marked as leader\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-zookeeper-2-4) 2.10.2.4. Zookeeper Not Ok

    Zookeeper instance is not ok[copy]

    ```
      - alert: ZookeeperNotOk
        expr: zk_ruok == 0
        for: 3m
        labels:
          severity: warning
        annotations:
          summary: Zookeeper Not Ok (instance {{ $labels.instance }})
          description: "Zookeeper instance is not ok\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#kafka-1) 2.11.1. Kafka : [danielqsj/kafka_exporter ](https://github.com/danielqsj/kafka_exporter)(2 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kafka-1-1) 2.11.1.1. Kafka topics replicas

    Kafka topic in-sync partition[copy]

    ```
      - alert: KafkaTopicsReplicas
        expr: sum(kafka_topic_partition_in_sync_replica) by (topic) < 3
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Kafka topics replicas (instance {{ $labels.instance }})
          description: "Kafka topic in-sync partition\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kafka-1-2) 2.11.1.2. Kafka consumers group

    Kafka consumers group[copy]

    ```
      - alert: KafkaConsumersGroup
        expr: sum(kafka_consumergroup_lag) by (consumergroup) > 50
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Kafka consumers group (instance {{ $labels.instance }})
          description: "Kafka consumers group\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#kafka-2) 2.11.2. Kafka : [linkedin/Burrow ](https://github.com/linkedin/Burrow)(2 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kafka-2-1) 2.11.2.1. Kafka topic offset decreased

    Kafka topic offset has decreased[copy]

    ```
      - alert: KafkaTopicOffsetDecreased
        expr: delta(kafka_burrow_partition_current_offset[1m]) < 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Kafka topic offset decreased (instance {{ $labels.instance }})
          description: "Kafka topic offset has decreased\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kafka-2-2) 2.11.2.2. Kafka consumer lag

    Kafka consumer has a 30 minutes and increasing lag[copy]

    ```
      - alert: KafkaConsumerLag
        expr: 'kafka_burrow_topic_partition_offset - on(partition, cluster, topic) group_right() kafka_burrow_partition_current_offset >= (kafka_burrow_topic_partition_offset offset 15m - on(partition, cluster, topic) group_right() kafka_burrow_partition_current_offset offset 15m)
      AND kafka_burrow_topic_partition_offset - on(partition, cluster, topic) group_right() kafka_burrow_partition_current_offset > 0'
    
        for: 15m
        labels:
          severity: warning
        annotations:
          summary: Kafka consumer lag (instance {{ $labels.instance }})
          description: "Kafka consumer has a 30 minutes and increasing lag\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#nginx-1) 3.1. Nginx : [nginx-lua-prometheus ](https://github.com/knyar/nginx-lua-prometheus)(3 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-nginx-1-1) 3.1.1. Nginx high HTTP 4xx error rate

    Too many HTTP requests with status 4xx (> 5%)[copy]

    ```
      - alert: NginxHighHttp4xxErrorRate
        expr: sum(rate(nginx_http_requests_total{status=~"^4.."}[1m])) / sum(rate(nginx_http_requests_total[1m])) * 100 > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Nginx high HTTP 4xx error rate (instance {{ $labels.instance }})
          description: "Too many HTTP requests with status 4xx (> 5%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-nginx-1-2) 3.1.2. Nginx high HTTP 5xx error rate

    Too many HTTP requests with status 5xx (> 5%)[copy]

    ```
      - alert: NginxHighHttp5xxErrorRate
        expr: sum(rate(nginx_http_requests_total{status=~"^5.."}[1m])) / sum(rate(nginx_http_requests_total[1m])) * 100 > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Nginx high HTTP 5xx error rate (instance {{ $labels.instance }})
          description: "Too many HTTP requests with status 5xx (> 5%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-nginx-1-3) 3.1.3. Nginx latency high

    Nginx p99 latency is higher than 3 seconds[copy]

    ```
      - alert: NginxLatencyHigh
        expr: histogram_quantile(0.99, sum(rate(nginx_http_request_duration_seconds_bucket[2m])) by (host, node)) > 3
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Nginx latency high (instance {{ $labels.instance }})
          description: "Nginx p99 latency is higher than 3 seconds\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#apache-1) 3.2. Apache : [Lusitaniae/apache_exporter ](https://github.com/Lusitaniae/apache_exporter)(3 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-apache-1-1) 3.2.1. Apache down

    Apache down[copy]

    ```
      - alert: ApacheDown
        expr: apache_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Apache down (instance {{ $labels.instance }})
          description: "Apache down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-apache-1-2) 3.2.2. Apache workers load

    Apache workers in busy state approach the max workers count 80% workers busy on {{ $labels.instance }}[copy]

    ```
      - alert: ApacheWorkersLoad
        expr: (sum by (instance) (apache_workers{state="busy"}) / sum by (instance) (apache_scoreboard) ) * 100 > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Apache workers load (instance {{ $labels.instance }})
          description: "Apache workers in busy state approach the max workers count 80% workers busy on {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-apache-1-3) 3.2.3. Apache restart

    Apache has just been restarted.[copy]

    ```
      - alert: ApacheRestart
        expr: apache_uptime_seconds_total / 60 < 1
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Apache restart (instance {{ $labels.instance }})
          description: "Apache has just been restarted.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#haproxy-1) 3.3.1. HaProxy : [Embedded exporter (HAProxy >= v2) ](https://github.com/haproxy/haproxy/tree/master/contrib/prometheus-exporter)(14 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-1) 3.3.1.1. HAProxy high HTTP 4xx error rate backend

    Too many HTTP requests with status 4xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}[copy]

    ```
      - alert: HaproxyHighHttp4xxErrorRateBackend
        expr: ((sum by (proxy) (rate(haproxy_server_http_responses_total{code="4xx"}[1m])) / sum by (proxy) (rate(haproxy_server_http_responses_total[1m]))) * 100) > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: HAProxy high HTTP 4xx error rate backend (instance {{ $labels.instance }})
          description: "Too many HTTP requests with status 4xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-2) 3.3.1.2. HAProxy high HTTP 5xx error rate backend

    Too many HTTP requests with status 5xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}[copy]

    ```
      - alert: HaproxyHighHttp5xxErrorRateBackend
        expr: ((sum by (proxy) (rate(haproxy_server_http_responses_total{code="5xx"}[1m])) / sum by (proxy) (rate(haproxy_server_http_responses_total[1m]))) * 100) > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: HAProxy high HTTP 5xx error rate backend (instance {{ $labels.instance }})
          description: "Too many HTTP requests with status 5xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-3) 3.3.1.3. HAProxy high HTTP 4xx error rate server

    Too many HTTP requests with status 4xx (> 5%) on server {{ $labels.server }}[copy]

    ```
      - alert: HaproxyHighHttp4xxErrorRateServer
        expr: ((sum by (server) (rate(haproxy_server_http_responses_total{code="4xx"}[1m])) / sum by (server) (rate(haproxy_server_http_responses_total[1m]))) * 100) > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: HAProxy high HTTP 4xx error rate server (instance {{ $labels.instance }})
          description: "Too many HTTP requests with status 4xx (> 5%) on server {{ $labels.server }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-4) 3.3.1.4. HAProxy high HTTP 5xx error rate server

    Too many HTTP requests with status 5xx (> 5%) on server {{ $labels.server }}[copy]

    ```
      - alert: HaproxyHighHttp5xxErrorRateServer
        expr: ((sum by (server) (rate(haproxy_server_http_responses_total{code="5xx"}[1m])) / sum by (server) (rate(haproxy_server_http_responses_total[1m]))) * 100) > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: HAProxy high HTTP 5xx error rate server (instance {{ $labels.instance }})
          description: "Too many HTTP requests with status 5xx (> 5%) on server {{ $labels.server }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-5) 3.3.1.5. HAProxy server response errors

    Too many response errors to {{ $labels.server }} server (> 5%).[copy]

    ```
      - alert: HaproxyServerResponseErrors
        expr: (sum by (server) (rate(haproxy_server_response_errors_total[1m])) / sum by (server) (rate(haproxy_server_http_responses_total[1m]))) * 100 > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: HAProxy server response errors (instance {{ $labels.instance }})
          description: "Too many response errors to {{ $labels.server }} server (> 5%).\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-6) 3.3.1.6. HAProxy backend connection errors

    Too many connection errors to {{ $labels.fqdn }}/{{ $labels.backend }} backend (> 100 req/s). Request throughput may be too high.[copy]

    ```
      - alert: HaproxyBackendConnectionErrors
        expr: (sum by (proxy) (rate(haproxy_backend_connection_errors_total[1m]))) > 100
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: HAProxy backend connection errors (instance {{ $labels.instance }})
          description: "Too many connection errors to {{ $labels.fqdn }}/{{ $labels.backend }} backend (> 100 req/s). Request throughput may be too high.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-7) 3.3.1.7. HAProxy server connection errors

    Too many connection errors to {{ $labels.server }} server (> 100 req/s). Request throughput may be too high.[copy]

    ```
      - alert: HaproxyServerConnectionErrors
        expr: (sum by (proxy) (rate(haproxy_server_connection_errors_total[1m]))) > 100
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: HAProxy server connection errors (instance {{ $labels.instance }})
          description: "Too many connection errors to {{ $labels.server }} server (> 100 req/s). Request throughput may be too high.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-8) 3.3.1.8. HAProxy backend max active session > 80%

    Session limit from backend {{ $labels.proxy }} to server {{ $labels.server }} reached 80% of limit - {{ $value | printf "%.2f"}}%[copy]

    ```
      - alert: HaproxyBackendMaxActiveSession>80%
        expr: ((haproxy_server_max_sessions >0) * 100) / (haproxy_server_limit_sessions > 0) > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: HAProxy backend max active session > 80% (instance {{ $labels.instance }})
          description: "Session limit from backend {{ $labels.proxy }} to server {{ $labels.server }} reached 80% of limit - {{ $value | printf \"%.2f\"}}%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-9) 3.3.1.9. HAProxy pending requests

    Some HAProxy requests are pending on {{ $labels.proxy }} - {{ $value | printf "%.2f"}}[copy]

    ```
      - alert: HaproxyPendingRequests
        expr: sum by (proxy) (rate(haproxy_backend_current_queue[2m])) > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: HAProxy pending requests (instance {{ $labels.instance }})
          description: "Some HAProxy requests are pending on {{ $labels.proxy }} - {{ $value | printf \"%.2f\"}}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-10) 3.3.1.10. HAProxy HTTP slowing down

    Average request time is increasing - {{ $value | printf "%.2f"}}[copy]

    ```
      - alert: HaproxyHttpSlowingDown
        expr: avg by (proxy) (haproxy_backend_max_total_time_seconds) > 1
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: HAProxy HTTP slowing down (instance {{ $labels.instance }})
          description: "Average request time is increasing - {{ $value | printf \"%.2f\"}}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-11) 3.3.1.11. HAProxy retry high

    High rate of retry on {{ $labels.proxy }} - {{ $value | printf "%.2f"}}[copy]

    ```
      - alert: HaproxyRetryHigh
        expr: sum by (proxy) (rate(haproxy_backend_retry_warnings_total[1m])) > 10
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: HAProxy retry high (instance {{ $labels.instance }})
          description: "High rate of retry on {{ $labels.proxy }} - {{ $value | printf \"%.2f\"}}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-12) 3.3.1.12. HAproxy has no alive backends

    HAProxy has no alive active or backup backends for {{ $labels.proxy }}[copy]

    ```
      - alert: HaproxyHasNoAliveBackends
        expr: haproxy_backend_active_servers + haproxy_backend_backup_servers == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: HAproxy has no alive backends (instance {{ $labels.instance }})
          description: "HAProxy has no alive active or backup backends for {{ $labels.proxy }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-13) 3.3.1.13. HAProxy frontend security blocked requests

    HAProxy is blocking requests for security reason[copy]

    ```
      - alert: HaproxyFrontendSecurityBlockedRequests
        expr: sum by (proxy) (rate(haproxy_frontend_denied_connections_total[2m])) > 10
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: HAProxy frontend security blocked requests (instance {{ $labels.instance }})
          description: "HAProxy is blocking requests for security reason\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-1-14) 3.3.1.14. HAProxy server healthcheck failure

    Some server healthcheck are failing on {{ $labels.server }}[copy]

    ```
      - alert: HaproxyServerHealthcheckFailure
        expr: increase(haproxy_server_check_failures_total[1m]) > 0
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: HAProxy server healthcheck failure (instance {{ $labels.instance }})
          description: "Some server healthcheck are failing on {{ $labels.server }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#haproxy-2) 3.3.2. HaProxy : [prometheus/haproxy_exporter (HAProxy < v2) ](https://github.com/prometheus/haproxy_exporter)(16 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-1) 3.3.2.1. HAProxy down

    HAProxy down[copy]

    ```
      - alert: HaproxyDown
        expr: haproxy_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: HAProxy down (instance {{ $labels.instance }})
          description: "HAProxy down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-2) 3.3.2.2. HAProxy high HTTP 4xx error rate backend

    Too many HTTP requests with status 4xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}[copy]

    ```
      - alert: HaproxyHighHttp4xxErrorRateBackend
        expr: sum by (backend) (rate(haproxy_server_http_responses_total{code="4xx"}[1m])) / sum by (backend) (rate(haproxy_server_http_responses_total[1m]) * 100) > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: HAProxy high HTTP 4xx error rate backend (instance {{ $labels.instance }})
          description: "Too many HTTP requests with status 4xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-3) 3.3.2.3. HAProxy high HTTP 4xx error rate backend

    Too many HTTP requests with status 5xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}[copy]

    ```
      - alert: HaproxyHighHttp4xxErrorRateBackend
        expr: sum by (backend) (rate(haproxy_server_http_responses_total{code="5xx"}[1m])) / sum by (backend) (rate(haproxy_server_http_responses_total[1m]) * 100) > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: HAProxy high HTTP 4xx error rate backend (instance {{ $labels.instance }})
          description: "Too many HTTP requests with status 5xx (> 5%) on backend {{ $labels.fqdn }}/{{ $labels.backend }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-4) 3.3.2.4. HAProxy high HTTP 4xx error rate server

    Too many HTTP requests with status 4xx (> 5%) on server {{ $labels.server }}[copy]

    ```
      - alert: HaproxyHighHttp4xxErrorRateServer
        expr: sum by (server) (rate(haproxy_server_http_responses_total{code="4xx"}[1m])) / sum by (server) (rate(haproxy_server_http_responses_total[1m]) * 100) > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: HAProxy high HTTP 4xx error rate server (instance {{ $labels.instance }})
          description: "Too many HTTP requests with status 4xx (> 5%) on server {{ $labels.server }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-5) 3.3.2.5. HAProxy high HTTP 5xx error rate server

    Too many HTTP requests with status 5xx (> 5%) on server {{ $labels.server }}[copy]

    ```
      - alert: HaproxyHighHttp5xxErrorRateServer
        expr: sum by (server) (rate(haproxy_server_http_responses_total{code="5xx"}[1m])) / sum by (server) (rate(haproxy_server_http_responses_total[1m]) * 100) > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: HAProxy high HTTP 5xx error rate server (instance {{ $labels.instance }})
          description: "Too many HTTP requests with status 5xx (> 5%) on server {{ $labels.server }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-6) 3.3.2.6. HAProxy server response errors

    Too many response errors to {{ $labels.server }} server (> 5%).[copy]

    ```
      - alert: HaproxyServerResponseErrors
        expr: sum by (server) (rate(haproxy_server_response_errors_total[1m])) / sum by (server) (rate(haproxy_server_http_responses_total[1m]) * 100) > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: HAProxy server response errors (instance {{ $labels.instance }})
          description: "Too many response errors to {{ $labels.server }} server (> 5%).\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-7) 3.3.2.7. HAProxy backend connection errors

    Too many connection errors to {{ $labels.fqdn }}/{{ $labels.backend }} backend (> 100 req/s). Request throughput may be too high.[copy]

    ```
      - alert: HaproxyBackendConnectionErrors
        expr: sum by (backend) (rate(haproxy_backend_connection_errors_total[1m])) > 100
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: HAProxy backend connection errors (instance {{ $labels.instance }})
          description: "Too many connection errors to {{ $labels.fqdn }}/{{ $labels.backend }} backend (> 100 req/s). Request throughput may be too high.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-8) 3.3.2.8. HAProxy server connection errors

    Too many connection errors to {{ $labels.server }} server (> 100 req/s). Request throughput may be too high.[copy]

    ```
      - alert: HaproxyServerConnectionErrors
        expr: sum by (server) (rate(haproxy_server_connection_errors_total[1m])) > 100
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: HAProxy server connection errors (instance {{ $labels.instance }})
          description: "Too many connection errors to {{ $labels.server }} server (> 100 req/s). Request throughput may be too high.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-9) 3.3.2.9. HAProxy backend max active session

    HAproxy backend {{ $labels.fqdn }}/{{ $labels.backend }} is reaching session limit (> 80%).[copy]

    ```
      - alert: HaproxyBackendMaxActiveSession
        expr: ((sum by (backend) (avg_over_time(haproxy_backend_max_sessions[2m])) / sum by (backend) (avg_over_time(haproxy_backend_limit_sessions[2m]))) * 100) > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: HAProxy backend max active session (instance {{ $labels.instance }})
          description: "HAproxy backend {{ $labels.fqdn }}/{{ $labels.backend }} is reaching session limit (> 80%).\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-10) 3.3.2.10. HAProxy pending requests

    Some HAProxy requests are pending on {{ $labels.fqdn }}/{{ $labels.backend }} backend[copy]

    ```
      - alert: HaproxyPendingRequests
        expr: sum by (backend) (haproxy_backend_current_queue) > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: HAProxy pending requests (instance {{ $labels.instance }})
          description: "Some HAProxy requests are pending on {{ $labels.fqdn }}/{{ $labels.backend }} backend\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-11) 3.3.2.11. HAProxy HTTP slowing down

    Average request time is increasing[copy]

    ```
      - alert: HaproxyHttpSlowingDown
        expr: avg by (backend) (haproxy_backend_http_total_time_average_seconds) > 1
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: HAProxy HTTP slowing down (instance {{ $labels.instance }})
          description: "Average request time is increasing\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-12) 3.3.2.12. HAProxy retry high

    High rate of retry on {{ $labels.fqdn }}/{{ $labels.backend }} backend[copy]

    ```
      - alert: HaproxyRetryHigh
        expr: rate(sum by (backend) (haproxy_backend_retry_warnings_total)) > 10
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: HAProxy retry high (instance {{ $labels.instance }})
          description: "High rate of retry on {{ $labels.fqdn }}/{{ $labels.backend }} backend\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-13) 3.3.2.13. HAProxy backend down

    HAProxy backend is down[copy]

    ```
      - alert: HaproxyBackendDown
        expr: haproxy_backend_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: HAProxy backend down (instance {{ $labels.instance }})
          description: "HAProxy backend is down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-14) 3.3.2.14. HAProxy server down

    HAProxy server is down[copy]

    ```
      - alert: HaproxyServerDown
        expr: haproxy_server_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: HAProxy server down (instance {{ $labels.instance }})
          description: "HAProxy server is down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-15) 3.3.2.15. HAProxy frontend security blocked requests

    HAProxy is blocking requests for security reason[copy]

    ```
      - alert: HaproxyFrontendSecurityBlockedRequests
        expr: rate(sum by (frontend) (haproxy_frontend_requests_denied_total)) > 10
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: HAProxy frontend security blocked requests (instance {{ $labels.instance }})
          description: "HAProxy is blocking requests for security reason\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-haproxy-2-16) 3.3.2.16. HAProxy server healthcheck failure

    Some server healthcheck are failing on {{ $labels.server }}[copy]

    ```
      - alert: HaproxyServerHealthcheckFailure
        expr: increase(haproxy_server_check_failures_total) > 0
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: HAProxy server healthcheck failure (instance {{ $labels.instance }})
          description: "Some server healthcheck are failing on {{ $labels.server }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#traefik-1) 3.4.1. Traefik : [Embedded exporter v2 ](https://docs.traefik.io/observability/metrics/prometheus/)(3 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-traefik-1-1) 3.4.1.1. Traefik service down

    All Traefik services are down[copy]

    ```
      - alert: TraefikServiceDown
        expr: count(traefik_service_server_up) by (service) == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Traefik service down (instance {{ $labels.instance }})
          description: "All Traefik services are down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-traefik-1-2) 3.4.1.2. Traefik high HTTP 4xx error rate service

    Traefik service 4xx error rate is above 5%[copy]

    ```
      - alert: TraefikHighHttp4xxErrorRateService
        expr: sum(rate(traefik_service_requests_total{code=~"4.*"}[3m])) by (service) / sum(rate(traefik_service_requests_total[3m])) by (service) * 100 > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Traefik high HTTP 4xx error rate service (instance {{ $labels.instance }})
          description: "Traefik service 4xx error rate is above 5%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-traefik-1-3) 3.4.1.3. Traefik high HTTP 5xx error rate service

    Traefik service 5xx error rate is above 5%[copy]

    ```
      - alert: TraefikHighHttp5xxErrorRateService
        expr: sum(rate(traefik_service_requests_total{code=~"5.*"}[3m])) by (service) / sum(rate(traefik_service_requests_total[3m])) by (service) * 100 > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Traefik high HTTP 5xx error rate service (instance {{ $labels.instance }})
          description: "Traefik service 5xx error rate is above 5%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#traefik-2) 3.4.2. Traefik : [Embedded exporter v1 ](https://docs.traefik.io/observability/metrics/prometheus/)(3 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-traefik-2-1) 3.4.2.1. Traefik backend down

    All Traefik backends are down[copy]

    ```
      - alert: TraefikBackendDown
        expr: count(traefik_backend_server_up) by (backend) == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Traefik backend down (instance {{ $labels.instance }})
          description: "All Traefik backends are down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-traefik-2-2) 3.4.2.2. Traefik high HTTP 4xx error rate backend

    Traefik backend 4xx error rate is above 5%[copy]

    ```
      - alert: TraefikHighHttp4xxErrorRateBackend
        expr: sum(rate(traefik_backend_requests_total{code=~"4.*"}[3m])) by (backend) / sum(rate(traefik_backend_requests_total[3m])) by (backend) * 100 > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Traefik high HTTP 4xx error rate backend (instance {{ $labels.instance }})
          description: "Traefik backend 4xx error rate is above 5%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-traefik-2-3) 3.4.2.3. Traefik high HTTP 5xx error rate backend

    Traefik backend 5xx error rate is above 5%[copy]

    ```
      - alert: TraefikHighHttp5xxErrorRateBackend
        expr: sum(rate(traefik_backend_requests_total{code=~"5.*"}[3m])) by (backend) / sum(rate(traefik_backend_requests_total[3m])) by (backend) * 100 > 5
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Traefik high HTTP 5xx error rate backend (instance {{ $labels.instance }})
          description: "Traefik backend 5xx error rate is above 5%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#php-fpm-1) 4.1. PHP-FPM : [bakins/php-fpm-exporter ](https://github.com/bakins/php-fpm-exporter)(1 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-php-fpm-1-1) 4.1.1. PHP-FPM max-children reached

    PHP-FPM reached max children - {{ $labels.instance }}[copy]

    ```
      - alert: Php-fpmMax-childrenReached
        expr: sum(phpfpm_max_children_reached_total) by (instance) > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: PHP-FPM max-children reached (instance {{ $labels.instance }})
          description: "PHP-FPM reached max children - {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#jvm-1) 4.2. JVM : [java-client ](https://github.com/prometheus/client_java)(1 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-jvm-1-1) 4.2.1. JVM memory filling up

    JVM memory is filling up (> 80%)[copy]

    ```
      - alert: JvmMemoryFillingUp
        expr: (sum by (instance)(jvm_memory_used_bytes{area="heap"}) / sum by (instance)(jvm_memory_max_bytes{area="heap"})) * 100 > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: JVM memory filling up (instance {{ $labels.instance }})
          description: "JVM memory is filling up (> 80%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#sidekiq-1) 4.3. Sidekiq : [Strech/sidekiq-prometheus-exporter ](https://github.com/Strech/sidekiq-prometheus-exporter)(2 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-sidekiq-1-1) 4.3.1. Sidekiq queue size

    Sidekiq queue {{ $labels.name }} is growing[copy]

    ```
      - alert: SidekiqQueueSize
        expr: sidekiq_queue_size > 100
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Sidekiq queue size (instance {{ $labels.instance }})
          description: "Sidekiq queue {{ $labels.name }} is growing\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-sidekiq-1-2) 4.3.2. Sidekiq scheduling latency too high

    Sidekiq jobs are taking more than 1min to be picked up. Users may be seeing delays in background processing.[copy]

    ```
      - alert: SidekiqSchedulingLatencyTooHigh
        expr: max(sidekiq_queue_latency) > 60
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Sidekiq scheduling latency too high (instance {{ $labels.instance }})
          description: "Sidekiq jobs are taking more than 1min to be picked up. Users may be seeing delays in background processing.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#kubernetes-1) 5.1. Kubernetes : [kube-state-metrics ](https://github.com/kubernetes/kube-state-metrics/tree/master/docs)(33 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-1) 5.1.1. Kubernetes Node ready

    Node {{ $labels.node }} has been unready for a long time[copy]

    ```
      - alert: KubernetesNodeReady
        expr: kube_node_status_condition{condition="Ready",status="true"} == 0
        for: 10m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes Node ready (instance {{ $labels.instance }})
          description: "Node {{ $labels.node }} has been unready for a long time\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-2) 5.1.2. Kubernetes memory pressure

    {{ $labels.node }} has MemoryPressure condition[copy]

    ```
      - alert: KubernetesMemoryPressure
        expr: kube_node_status_condition{condition="MemoryPressure",status="true"} == 1
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes memory pressure (instance {{ $labels.instance }})
          description: "{{ $labels.node }} has MemoryPressure condition\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-3) 5.1.3. Kubernetes disk pressure

    {{ $labels.node }} has DiskPressure condition[copy]

    ```
      - alert: KubernetesDiskPressure
        expr: kube_node_status_condition{condition="DiskPressure",status="true"} == 1
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes disk pressure (instance {{ $labels.instance }})
          description: "{{ $labels.node }} has DiskPressure condition\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-4) 5.1.4. Kubernetes out of disk

    {{ $labels.node }} has OutOfDisk condition[copy]

    ```
      - alert: KubernetesOutOfDisk
        expr: kube_node_status_condition{condition="OutOfDisk",status="true"} == 1
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes out of disk (instance {{ $labels.instance }})
          description: "{{ $labels.node }} has OutOfDisk condition\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-5) 5.1.5. Kubernetes out of capacity

    {{ $labels.node }} is out of capacity[copy]

    ```
      - alert: KubernetesOutOfCapacity
        expr: sum by (node) ((kube_pod_status_phase{phase="Running"} == 1) + on(uid) group_left(node) (0 * kube_pod_info{pod_template_hash=""})) / sum by (node) (kube_node_status_allocatable{resource="pods"}) * 100 > 90
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes out of capacity (instance {{ $labels.instance }})
          description: "{{ $labels.node }} is out of capacity\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-6) 5.1.6. Kubernetes container oom killer

    Container {{ $labels.container }} in pod {{ $labels.namespace }}/{{ $labels.pod }} has been OOMKilled {{ $value }} times in the last 10 minutes.[copy]

    ```
      - alert: KubernetesContainerOomKiller
        expr: (kube_pod_container_status_restarts_total - kube_pod_container_status_restarts_total offset 10m >= 1) and ignoring (reason) min_over_time(kube_pod_container_status_last_terminated_reason{reason="OOMKilled"}[10m]) == 1
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes container oom killer (instance {{ $labels.instance }})
          description: "Container {{ $labels.container }} in pod {{ $labels.namespace }}/{{ $labels.pod }} has been OOMKilled {{ $value }} times in the last 10 minutes.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-7) 5.1.7. Kubernetes Job failed

    Job {{$labels.namespace}}/{{$labels.exported_job}} failed to complete[copy]

    ```
      - alert: KubernetesJobFailed
        expr: kube_job_status_failed > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes Job failed (instance {{ $labels.instance }})
          description: "Job {{$labels.namespace}}/{{$labels.exported_job}} failed to complete\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-8) 5.1.8. Kubernetes CronJob suspended

    CronJob {{ $labels.namespace }}/{{ $labels.cronjob }} is suspended[copy]

    ```
      - alert: KubernetesCronjobSuspended
        expr: kube_cronjob_spec_suspend != 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes CronJob suspended (instance {{ $labels.instance }})
          description: "CronJob {{ $labels.namespace }}/{{ $labels.cronjob }} is suspended\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-9) 5.1.9. Kubernetes PersistentVolumeClaim pending

    PersistentVolumeClaim {{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }} is pending[copy]

    ```
      - alert: KubernetesPersistentvolumeclaimPending
        expr: kube_persistentvolumeclaim_status_phase{phase="Pending"} == 1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes PersistentVolumeClaim pending (instance {{ $labels.instance }})
          description: "PersistentVolumeClaim {{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }} is pending\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-10) 5.1.10. Kubernetes Volume out of disk space

    Volume is almost full (< 10% left)[copy]

    ```
      - alert: KubernetesVolumeOutOfDiskSpace
        expr: kubelet_volume_stats_available_bytes / kubelet_volume_stats_capacity_bytes * 100 < 10
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes Volume out of disk space (instance {{ $labels.instance }})
          description: "Volume is almost full (< 10% left)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-11) 5.1.11. Kubernetes Volume full in four days

    {{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }} is expected to fill up within four days. Currently {{ $value | humanize }}% is available.[copy]

    ```
      - alert: KubernetesVolumeFullInFourDays
        expr: predict_linear(kubelet_volume_stats_available_bytes[6h], 4 * 24 * 3600) < 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes Volume full in four days (instance {{ $labels.instance }})
          description: "{{ $labels.namespace }}/{{ $labels.persistentvolumeclaim }} is expected to fill up within four days. Currently {{ $value | humanize }}% is available.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-12) 5.1.12. Kubernetes PersistentVolume error

    Persistent volume is in bad state[copy]

    ```
      - alert: KubernetesPersistentvolumeError
        expr: kube_persistentvolume_status_phase{phase=~"Failed|Pending", job="kube-state-metrics"} > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes PersistentVolume error (instance {{ $labels.instance }})
          description: "Persistent volume is in bad state\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-13) 5.1.13. Kubernetes StatefulSet down

    A StatefulSet went down[copy]

    ```
      - alert: KubernetesStatefulsetDown
        expr: (kube_statefulset_status_replicas_ready / kube_statefulset_status_replicas_current) != 1
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes StatefulSet down (instance {{ $labels.instance }})
          description: "A StatefulSet went down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-14) 5.1.14. Kubernetes HPA scaling ability

    Pod is unable to scale[copy]

    ```
      - alert: KubernetesHpaScalingAbility
        expr: kube_hpa_status_condition{status="false", condition="AbleToScale"} == 1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes HPA scaling ability (instance {{ $labels.instance }})
          description: "Pod is unable to scale\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-15) 5.1.15. Kubernetes HPA metric availability

    HPA is not able to collect metrics[copy]

    ```
      - alert: KubernetesHpaMetricAvailability
        expr: kube_hpa_status_condition{status="false", condition="ScalingActive"} == 1
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes HPA metric availability (instance {{ $labels.instance }})
          description: "HPA is not able to collect metrics\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-16) 5.1.16. Kubernetes HPA scale capability

    The maximum number of desired Pods has been hit[copy]

    ```
      - alert: KubernetesHpaScaleCapability
        expr: kube_hpa_status_desired_replicas >= kube_hpa_spec_max_replicas
        for: 2m
        labels:
          severity: info
        annotations:
          summary: Kubernetes HPA scale capability (instance {{ $labels.instance }})
          description: "The maximum number of desired Pods has been hit\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-17) 5.1.17. Kubernetes Pod not healthy

    Pod has been in a non-ready state for longer than 15 minutes.[copy]

    ```
      - alert: KubernetesPodNotHealthy
        expr: min_over_time(sum by (namespace, pod) (kube_pod_status_phase{phase=~"Pending|Unknown|Failed"})[15m:1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes Pod not healthy (instance {{ $labels.instance }})
          description: "Pod has been in a non-ready state for longer than 15 minutes.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-18) 5.1.18. Kubernetes pod crash looping

    Pod {{ $labels.pod }} is crash looping[copy]

    ```
      - alert: KubernetesPodCrashLooping
        expr: increase(kube_pod_container_status_restarts_total[1m]) > 3
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes pod crash looping (instance {{ $labels.instance }})
          description: "Pod {{ $labels.pod }} is crash looping\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-19) 5.1.19. Kubernetes ReplicasSet mismatch

    Deployment Replicas mismatch[copy]

    ```
      - alert: KubernetesReplicassetMismatch
        expr: kube_replicaset_spec_replicas != kube_replicaset_status_ready_replicas
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes ReplicasSet mismatch (instance {{ $labels.instance }})
          description: "Deployment Replicas mismatch\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-20) 5.1.20. Kubernetes Deployment replicas mismatch

    Deployment Replicas mismatch[copy]

    ```
      - alert: KubernetesDeploymentReplicasMismatch
        expr: kube_deployment_spec_replicas != kube_deployment_status_replicas_available
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes Deployment replicas mismatch (instance {{ $labels.instance }})
          description: "Deployment Replicas mismatch\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-21) 5.1.21. Kubernetes StatefulSet replicas mismatch

    A StatefulSet does not match the expected number of replicas.[copy]

    ```
      - alert: KubernetesStatefulsetReplicasMismatch
        expr: kube_statefulset_status_replicas_ready != kube_statefulset_status_replicas
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes StatefulSet replicas mismatch (instance {{ $labels.instance }})
          description: "A StatefulSet does not match the expected number of replicas.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-22) 5.1.22. Kubernetes Deployment generation mismatch

    A Deployment has failed but has not been rolled back.[copy]

    ```
      - alert: KubernetesDeploymentGenerationMismatch
        expr: kube_deployment_status_observed_generation != kube_deployment_metadata_generation
        for: 10m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes Deployment generation mismatch (instance {{ $labels.instance }})
          description: "A Deployment has failed but has not been rolled back.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-23) 5.1.23. Kubernetes StatefulSet generation mismatch

    A StatefulSet has failed but has not been rolled back.[copy]

    ```
      - alert: KubernetesStatefulsetGenerationMismatch
        expr: kube_statefulset_status_observed_generation != kube_statefulset_metadata_generation
        for: 10m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes StatefulSet generation mismatch (instance {{ $labels.instance }})
          description: "A StatefulSet has failed but has not been rolled back.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-24) 5.1.24. Kubernetes StatefulSet update not rolled out

    StatefulSet update has not been rolled out.[copy]

    ```
      - alert: KubernetesStatefulsetUpdateNotRolledOut
        expr: max without (revision) (kube_statefulset_status_current_revision unless kube_statefulset_status_update_revision) * (kube_statefulset_replicas != kube_statefulset_status_replicas_updated)
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes StatefulSet update not rolled out (instance {{ $labels.instance }})
          description: "StatefulSet update has not been rolled out.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-25) 5.1.25. Kubernetes DaemonSet rollout stuck

    Some Pods of DaemonSet are not scheduled or not ready[copy]

    ```
      - alert: KubernetesDaemonsetRolloutStuck
        expr: kube_daemonset_status_number_ready / kube_daemonset_status_desired_number_scheduled * 100 < 100 or kube_daemonset_status_desired_number_scheduled - kube_daemonset_status_current_number_scheduled > 0
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes DaemonSet rollout stuck (instance {{ $labels.instance }})
          description: "Some Pods of DaemonSet are not scheduled or not ready\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-26) 5.1.26. Kubernetes DaemonSet misscheduled

    Some DaemonSet Pods are running where they are not supposed to run[copy]

    ```
      - alert: KubernetesDaemonsetMisscheduled
        expr: kube_daemonset_status_number_misscheduled > 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes DaemonSet misscheduled (instance {{ $labels.instance }})
          description: "Some DaemonSet Pods are running where they are not supposed to run\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-27) 5.1.27. Kubernetes CronJob too long

    CronJob {{ $labels.namespace }}/{{ $labels.cronjob }} is taking more than 1h to complete.[copy]

    ```
      - alert: KubernetesCronjobTooLong
        expr: time() - kube_cronjob_next_schedule_time > 3600
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes CronJob too long (instance {{ $labels.instance }})
          description: "CronJob {{ $labels.namespace }}/{{ $labels.cronjob }} is taking more than 1h to complete.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-28) 5.1.28. Kubernetes job slow completion

    Kubernetes Job {{ $labels.namespace }}/{{ $labels.job_name }} did not complete in time.[copy]

    ```
      - alert: KubernetesJobSlowCompletion
        expr: kube_job_spec_completions - kube_job_status_succeeded > 0
        for: 12h
        labels:
          severity: critical
        annotations:
          summary: Kubernetes job slow completion (instance {{ $labels.instance }})
          description: "Kubernetes Job {{ $labels.namespace }}/{{ $labels.job_name }} did not complete in time.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-29) 5.1.29. Kubernetes API server errors

    Kubernetes API server is experiencing high error rate[copy]

    ```
      - alert: KubernetesApiServerErrors
        expr: sum(rate(apiserver_request_count{job="apiserver",code=~"^(?:5..)$"}[1m])) / sum(rate(apiserver_request_count{job="apiserver"}[1m])) * 100 > 3
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes API server errors (instance {{ $labels.instance }})
          description: "Kubernetes API server is experiencing high error rate\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-30) 5.1.30. Kubernetes API client errors

    Kubernetes API client is experiencing high error rate[copy]

    ```
      - alert: KubernetesApiClientErrors
        expr: (sum(rate(rest_client_requests_total{code=~"(4|5).."}[1m])) by (instance, job) / sum(rate(rest_client_requests_total[1m])) by (instance, job)) * 100 > 1
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes API client errors (instance {{ $labels.instance }})
          description: "Kubernetes API client is experiencing high error rate\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-31) 5.1.31. Kubernetes client certificate expires next week

    A client certificate used to authenticate to the apiserver is expiring next week.[copy]

    ```
      - alert: KubernetesClientCertificateExpiresNextWeek
        expr: apiserver_client_certificate_expiration_seconds_count{job="apiserver"} > 0 and histogram_quantile(0.01, sum by (job, le) (rate(apiserver_client_certificate_expiration_seconds_bucket{job="apiserver"}[5m]))) < 7*24*60*60
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes client certificate expires next week (instance {{ $labels.instance }})
          description: "A client certificate used to authenticate to the apiserver is expiring next week.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-32) 5.1.32. Kubernetes client certificate expires soon

    A client certificate used to authenticate to the apiserver is expiring in less than 24.0 hours.[copy]

    ```
      - alert: KubernetesClientCertificateExpiresSoon
        expr: apiserver_client_certificate_expiration_seconds_count{job="apiserver"} > 0 and histogram_quantile(0.01, sum by (job, le) (rate(apiserver_client_certificate_expiration_seconds_bucket{job="apiserver"}[5m]))) < 24*60*60
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Kubernetes client certificate expires soon (instance {{ $labels.instance }})
          description: "A client certificate used to authenticate to the apiserver is expiring in less than 24.0 hours.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-kubernetes-1-33) 5.1.33. Kubernetes API server latency

    Kubernetes API server has a 99th percentile latency of {{ $value }} seconds for {{ $labels.verb }} {{ $labels.resource }}.[copy]

    ```
      - alert: KubernetesApiServerLatency
        expr: histogram_quantile(0.99, sum(rate(apiserver_request_latencies_bucket{subresource!="log",verb!~"^(?:CONNECT|WATCHLIST|WATCH|PROXY)$"} [10m])) WITHOUT (instance, resource)) / 1e+06 > 1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Kubernetes API server latency (instance {{ $labels.instance }})
          description: "Kubernetes API server has a 99th percentile latency of {{ $value }} seconds for {{ $labels.verb }} {{ $labels.resource }}.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#nomad-1) 5.2. Nomad : Embedded exporter (4 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-nomad-1-1) 5.2.1. Nomad job failed

    Nomad job failed[copy]

    ```
      - alert: NomadJobFailed
        expr: nomad_nomad_job_summary_failed > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Nomad job failed (instance {{ $labels.instance }})
          description: "Nomad job failed\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-nomad-1-2) 5.2.2. Nomad job lost

    Nomad job lost[copy]

    ```
      - alert: NomadJobLost
        expr: nomad_nomad_job_summary_lost > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Nomad job lost (instance {{ $labels.instance }})
          description: "Nomad job lost\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-nomad-1-3) 5.2.3. Nomad job queued

    Nomad job queued[copy]

    ```
      - alert: NomadJobQueued
        expr: nomad_nomad_job_summary_queued > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Nomad job queued (instance {{ $labels.instance }})
          description: "Nomad job queued\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-nomad-1-4) 5.2.4. Nomad blocked evaluation

    Nomad blocked evaluation[copy]

    ```
      - alert: NomadBlockedEvaluation
        expr: nomad_nomad_blocked_evals_total_blocked > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Nomad blocked evaluation (instance {{ $labels.instance }})
          description: "Nomad blocked evaluation\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#consul-1) 5.3. Consul : [prometheus/consul_exporter ](https://github.com/prometheus/consul_exporter)(3 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-consul-1-1) 5.3.1. Consul service healthcheck failed

    Service: `{{ $labels.service_name }}` Healthcheck: `{{ $labels.service_id }}`[copy]

    ```
      - alert: ConsulServiceHealthcheckFailed
        expr: consul_catalog_service_node_healthy == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Consul service healthcheck failed (instance {{ $labels.instance }})
          description: "Service: `{{ $labels.service_name }}` Healthcheck: `{{ $labels.service_id }}`\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-consul-1-2) 5.3.2. Consul missing master node

    Numbers of consul raft peers should be 3, in order to preserve quorum.[copy]

    ```
      - alert: ConsulMissingMasterNode
        expr: consul_raft_peers < 3
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Consul missing master node (instance {{ $labels.instance }})
          description: "Numbers of consul raft peers should be 3, in order to preserve quorum.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-consul-1-3) 5.3.3. Consul agent unhealthy

    A Consul agent is down[copy]

    ```
      - alert: ConsulAgentUnhealthy
        expr: consul_health_node_status{status="critical"} == 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Consul agent unhealthy (instance {{ $labels.instance }})
          description: "A Consul agent is down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#etcd-1) 5.4. Etcd (13 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-1) 5.4.1. Etcd insufficient Members

    Etcd cluster should have an odd number of members[copy]

    ```
      - alert: EtcdInsufficientMembers
        expr: count(etcd_server_id) % 2 == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Etcd insufficient Members (instance {{ $labels.instance }})
          description: "Etcd cluster should have an odd number of members\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-2) 5.4.2. Etcd no Leader

    Etcd cluster have no leader[copy]

    ```
      - alert: EtcdNoLeader
        expr: etcd_server_has_leader == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Etcd no Leader (instance {{ $labels.instance }})
          description: "Etcd cluster have no leader\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-3) 5.4.3. Etcd high number of leader changes

    Etcd leader changed more than 2 times during 10 minutes[copy]

    ```
      - alert: EtcdHighNumberOfLeaderChanges
        expr: increase(etcd_server_leader_changes_seen_total[10m]) > 2
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Etcd high number of leader changes (instance {{ $labels.instance }})
          description: "Etcd leader changed more than 2 times during 10 minutes\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-4) 5.4.4. Etcd high number of failed GRPC requests

    More than 1% GRPC request failure detected in Etcd[copy]

    ```
      - alert: EtcdHighNumberOfFailedGrpcRequests
        expr: sum(rate(grpc_server_handled_total{grpc_code!="OK"}[1m])) BY (grpc_service, grpc_method) / sum(rate(grpc_server_handled_total[1m])) BY (grpc_service, grpc_method) > 0.01
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Etcd high number of failed GRPC requests (instance {{ $labels.instance }})
          description: "More than 1% GRPC request failure detected in Etcd\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-5) 5.4.5. Etcd high number of failed GRPC requests

    More than 5% GRPC request failure detected in Etcd[copy]

    ```
      - alert: EtcdHighNumberOfFailedGrpcRequests
        expr: sum(rate(grpc_server_handled_total{grpc_code!="OK"}[1m])) BY (grpc_service, grpc_method) / sum(rate(grpc_server_handled_total[1m])) BY (grpc_service, grpc_method) > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Etcd high number of failed GRPC requests (instance {{ $labels.instance }})
          description: "More than 5% GRPC request failure detected in Etcd\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-6) 5.4.6. Etcd GRPC requests slow

    GRPC requests slowing down, 99th percentile is over 0.15s[copy]

    ```
      - alert: EtcdGrpcRequestsSlow
        expr: histogram_quantile(0.99, sum(rate(grpc_server_handling_seconds_bucket{grpc_type="unary"}[1m])) by (grpc_service, grpc_method, le)) > 0.15
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Etcd GRPC requests slow (instance {{ $labels.instance }})
          description: "GRPC requests slowing down, 99th percentile is over 0.15s\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-7) 5.4.7. Etcd high number of failed HTTP requests

    More than 1% HTTP failure detected in Etcd[copy]

    ```
      - alert: EtcdHighNumberOfFailedHttpRequests
        expr: sum(rate(etcd_http_failed_total[1m])) BY (method) / sum(rate(etcd_http_received_total[1m])) BY (method) > 0.01
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Etcd high number of failed HTTP requests (instance {{ $labels.instance }})
          description: "More than 1% HTTP failure detected in Etcd\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-8) 5.4.8. Etcd high number of failed HTTP requests

    More than 5% HTTP failure detected in Etcd[copy]

    ```
      - alert: EtcdHighNumberOfFailedHttpRequests
        expr: sum(rate(etcd_http_failed_total[1m])) BY (method) / sum(rate(etcd_http_received_total[1m])) BY (method) > 0.05
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: Etcd high number of failed HTTP requests (instance {{ $labels.instance }})
          description: "More than 5% HTTP failure detected in Etcd\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-9) 5.4.9. Etcd HTTP requests slow

    HTTP requests slowing down, 99th percentile is over 0.15s[copy]

    ```
      - alert: EtcdHttpRequestsSlow
        expr: histogram_quantile(0.99, rate(etcd_http_successful_duration_seconds_bucket[1m])) > 0.15
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Etcd HTTP requests slow (instance {{ $labels.instance }})
          description: "HTTP requests slowing down, 99th percentile is over 0.15s\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-10) 5.4.10. Etcd member communication slow

    Etcd member communication slowing down, 99th percentile is over 0.15s[copy]

    ```
      - alert: EtcdMemberCommunicationSlow
        expr: histogram_quantile(0.99, rate(etcd_network_peer_round_trip_time_seconds_bucket[1m])) > 0.15
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Etcd member communication slow (instance {{ $labels.instance }})
          description: "Etcd member communication slowing down, 99th percentile is over 0.15s\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-11) 5.4.11. Etcd high number of failed proposals

    Etcd server got more than 5 failed proposals past hour[copy]

    ```
      - alert: EtcdHighNumberOfFailedProposals
        expr: increase(etcd_server_proposals_failed_total[1h]) > 5
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Etcd high number of failed proposals (instance {{ $labels.instance }})
          description: "Etcd server got more than 5 failed proposals past hour\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-12) 5.4.12. Etcd high fsync durations

    Etcd WAL fsync duration increasing, 99th percentile is over 0.5s[copy]

    ```
      - alert: EtcdHighFsyncDurations
        expr: histogram_quantile(0.99, rate(etcd_disk_wal_fsync_duration_seconds_bucket[1m])) > 0.5
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Etcd high fsync durations (instance {{ $labels.instance }})
          description: "Etcd WAL fsync duration increasing, 99th percentile is over 0.5s\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-etcd-1-13) 5.4.13. Etcd high commit durations

    Etcd commit duration increasing, 99th percentile is over 0.25s[copy]

    ```
      - alert: EtcdHighCommitDurations
        expr: histogram_quantile(0.99, rate(etcd_disk_backend_commit_duration_seconds_bucket[1m])) > 0.25
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Etcd high commit durations (instance {{ $labels.instance }})
          description: "Etcd commit duration increasing, 99th percentile is over 0.25s\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#linkerd-1) 5.5. Linkerd : [Embedded exporter ](https://linkerd.io/2/tasks/exporting-metrics/)(1 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-linkerd-1-1) 5.5.1. Linkerd high error rate

    Linkerd error rate for {{ $labels.deployment | $labels.statefulset | $labels.daemonset }} is over 10%[copy]

    ```
      - alert: LinkerdHighErrorRate
        expr: sum(rate(request_errors_total[1m])) by (deployment, statefulset, daemonset) / sum(rate(request_total[1m])) by (deployment, statefulset, daemonset) * 100 > 10
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Linkerd high error rate (instance {{ $labels.instance }})
          description: "Linkerd error rate for {{ $labels.deployment | $labels.statefulset | $labels.daemonset }} is over 10%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#istio-1) 5.6. Istio : [Embedded exporter ](https://istio.io/latest/docs/tasks/observability/metrics/querying-metrics/)(10 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-istio-1-1) 5.6.1. Istio Kubernetes gateway availability drop

    Gateway pods have dropped. Inbound traffic will likely be affected.[copy]

    ```
      - alert: IstioKubernetesGatewayAvailabilityDrop
        expr: min(kube_deployment_status_replicas_available{deployment="istio-ingressgateway", namespace="istio-system"}) without (instance, pod) < 2
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Istio Kubernetes gateway availability drop (instance {{ $labels.instance }})
          description: "Gateway pods have dropped. Inbound traffic will likely be affected.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-istio-1-2) 5.6.2. Istio Pilot high total request rate

    Number of Istio Pilot push errors is too high (> 5%). Envoy sidecars might have outdated configuration.[copy]

    ```
      - alert: IstioPilotHighTotalRequestRate
        expr: sum(rate(pilot_xds_push_errors[1m])) / sum(rate(pilot_xds_pushes[1m])) * 100 > 5
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Istio Pilot high total request rate (instance {{ $labels.instance }})
          description: "Number of Istio Pilot push errors is too high (> 5%). Envoy sidecars might have outdated configuration.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-istio-1-3) 5.6.3. Istio Mixer Prometheus dispatches low

    Number of Mixer dispatches to Prometheus is too low. Istio metrics might not be being exported properly.[copy]

    ```
      - alert: IstioMixerPrometheusDispatchesLow
        expr: sum(rate(mixer_runtime_dispatches_total{adapter=~"prometheus"}[1m])) < 180
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Istio Mixer Prometheus dispatches low (instance {{ $labels.instance }})
          description: "Number of Mixer dispatches to Prometheus is too low. Istio metrics might not be being exported properly.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-istio-1-4) 5.6.4. Istio high total request rate

    Global request rate in the service mesh is unusually high.[copy]

    ```
      - alert: IstioHighTotalRequestRate
        expr: sum(rate(istio_requests_total{reporter="destination"}[5m])) > 1000
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Istio high total request rate (instance {{ $labels.instance }})
          description: "Global request rate in the service mesh is unusually high.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-istio-1-5) 5.6.5. Istio low total request rate

    Global request rate in the service mesh is unusually low.[copy]

    ```
      - alert: IstioLowTotalRequestRate
        expr: sum(rate(istio_requests_total{reporter="destination"}[5m])) < 100
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Istio low total request rate (instance {{ $labels.instance }})
          description: "Global request rate in the service mesh is unusually low.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-istio-1-6) 5.6.6. Istio high 4xx error rate

    High percentage of HTTP 5xx responses in Istio (> 5%).[copy]

    ```
      - alert: IstioHigh4xxErrorRate
        expr: sum(rate(istio_requests_total{reporter="destination", response_code=~"4.*"}[5m])) / sum(rate(istio_requests_total{reporter="destination"}[5m])) * 100 > 5
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Istio high 4xx error rate (instance {{ $labels.instance }})
          description: "High percentage of HTTP 5xx responses in Istio (> 5%).\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-istio-1-7) 5.6.7. Istio high 5xx error rate

    High percentage of HTTP 5xx responses in Istio (> 5%).[copy]

    ```
      - alert: IstioHigh5xxErrorRate
        expr: sum(rate(istio_requests_total{reporter="destination", response_code=~"5.*"}[5m])) / sum(rate(istio_requests_total{reporter="destination"}[5m])) * 100 > 5
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Istio high 5xx error rate (instance {{ $labels.instance }})
          description: "High percentage of HTTP 5xx responses in Istio (> 5%).\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-istio-1-8) 5.6.8. Istio high request latency

    Istio average requests execution is longer than 100ms.[copy]

    ```
      - alert: IstioHighRequestLatency
        expr: rate(istio_request_duration_milliseconds_sum[1m]) / rate(istio_request_duration_milliseconds_count[1m]) > 0.1
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Istio high request latency (instance {{ $labels.instance }})
          description: "Istio average requests execution is longer than 100ms.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-istio-1-9) 5.6.9. Istio latency 99 percentile

    Istio 1% slowest requests are longer than 1s.[copy]

    ```
      - alert: IstioLatency99Percentile
        expr: histogram_quantile(0.99, rate(istio_request_duration_milliseconds_bucket[1m])) > 1
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Istio latency 99 percentile (instance {{ $labels.instance }})
          description: "Istio 1% slowest requests are longer than 1s.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-istio-1-10) 5.6.10. Istio Pilot Duplicate Entry

    Istio pilot duplicate entry error.[copy]

    ```
      - alert: IstioPilotDuplicateEntry
        expr: sum(rate(pilot_duplicate_envoy_clusters{}[5m])) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Istio Pilot Duplicate Entry (instance {{ $labels.instance }})
          description: "Istio pilot duplicate entry error.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#ceph-1) 6.1. Ceph : [Embedded exporter ](https://docs.ceph.com/docs/luminous/mgr/prometheus/)(13 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-1) 6.1.1. Ceph State

    Ceph instance unhealthy[copy]

    ```
      - alert: CephState
        expr: ceph_health_status != 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Ceph State (instance {{ $labels.instance }})
          description: "Ceph instance unhealthy\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-2) 6.1.2. Ceph monitor clock skew

    Ceph monitor clock skew detected. Please check ntp and hardware clock settings[copy]

    ```
      - alert: CephMonitorClockSkew
        expr: abs(ceph_monitor_clock_skew_seconds) > 0.2
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Ceph monitor clock skew (instance {{ $labels.instance }})
          description: "Ceph monitor clock skew detected. Please check ntp and hardware clock settings\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-3) 6.1.3. Ceph monitor low space

    Ceph monitor storage is low.[copy]

    ```
      - alert: CephMonitorLowSpace
        expr: ceph_monitor_avail_percent < 10
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Ceph monitor low space (instance {{ $labels.instance }})
          description: "Ceph monitor storage is low.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-4) 6.1.4. Ceph OSD Down

    Ceph Object Storage Daemon Down[copy]

    ```
      - alert: CephOsdDown
        expr: ceph_osd_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Ceph OSD Down (instance {{ $labels.instance }})
          description: "Ceph Object Storage Daemon Down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-5) 6.1.5. Ceph high OSD latency

    Ceph Object Storage Daemon latency is high. Please check if it doesn't stuck in weird state.[copy]

    ```
      - alert: CephHighOsdLatency
        expr: ceph_osd_perf_apply_latency_seconds > 5
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Ceph high OSD latency (instance {{ $labels.instance }})
          description: "Ceph Object Storage Daemon latency is high. Please check if it doesn't stuck in weird state.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-6) 6.1.6. Ceph OSD low space

    Ceph Object Storage Daemon is going out of space. Please add more disks.[copy]

    ```
      - alert: CephOsdLowSpace
        expr: ceph_osd_utilization > 90
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Ceph OSD low space (instance {{ $labels.instance }})
          description: "Ceph Object Storage Daemon is going out of space. Please add more disks.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-7) 6.1.7. Ceph OSD reweighted

    Ceph Object Storage Daemon takes too much time to resize.[copy]

    ```
      - alert: CephOsdReweighted
        expr: ceph_osd_weight < 1
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Ceph OSD reweighted (instance {{ $labels.instance }})
          description: "Ceph Object Storage Daemon takes too much time to resize.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-8) 6.1.8. Ceph PG down

    Some Ceph placement groups are down. Please ensure that all the data are available.[copy]

    ```
      - alert: CephPgDown
        expr: ceph_pg_down > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Ceph PG down (instance {{ $labels.instance }})
          description: "Some Ceph placement groups are down. Please ensure that all the data are available.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-9) 6.1.9. Ceph PG incomplete

    Some Ceph placement groups are incomplete. Please ensure that all the data are available.[copy]

    ```
      - alert: CephPgIncomplete
        expr: ceph_pg_incomplete > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Ceph PG incomplete (instance {{ $labels.instance }})
          description: "Some Ceph placement groups are incomplete. Please ensure that all the data are available.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-10) 6.1.10. Ceph PG inconsistent

    Some Ceph placement groups are inconsistent. Data is available but inconsistent across nodes.[copy]

    ```
      - alert: CephPgInconsistent
        expr: ceph_pg_inconsistent > 0
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Ceph PG inconsistent (instance {{ $labels.instance }})
          description: "Some Ceph placement groups are inconsistent. Data is available but inconsistent across nodes.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-11) 6.1.11. Ceph PG activation long

    Some Ceph placement groups are too long to activate.[copy]

    ```
      - alert: CephPgActivationLong
        expr: ceph_pg_activating > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Ceph PG activation long (instance {{ $labels.instance }})
          description: "Some Ceph placement groups are too long to activate.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-12) 6.1.12. Ceph PG backfill full

    Some Ceph placement groups are located on full Object Storage Daemon on cluster. Those PGs can be unavailable shortly. Please check OSDs, change weight or reconfigure CRUSH rules.[copy]

    ```
      - alert: CephPgBackfillFull
        expr: ceph_pg_backfill_toofull > 0
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: Ceph PG backfill full (instance {{ $labels.instance }})
          description: "Some Ceph placement groups are located on full Object Storage Daemon on cluster. Those PGs can be unavailable shortly. Please check OSDs, change weight or reconfigure CRUSH rules.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ceph-1-13) 6.1.13. Ceph PG unavailable

    Some Ceph placement groups are unavailable.[copy]

    ```
      - alert: CephPgUnavailable
        expr: ceph_pg_total - ceph_pg_active > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Ceph PG unavailable (instance {{ $labels.instance }})
          description: "Some Ceph placement groups are unavailable.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#speedtest-1) 6.2. SpeedTest : [Speedtest exporter ](https://github.com/nlamirault/speedtest_exporter)(2 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-speedtest-1-1) 6.2.1. SpeedTest Slow Internet Download

    Internet download speed is currently {{humanize $value}} Mbps.[copy]

    ```
      - alert: SpeedtestSlowInternetDownload
        expr: avg_over_time(speedtest_download[10m]) < 100
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: SpeedTest Slow Internet Download (instance {{ $labels.instance }})
          description: "Internet download speed is currently {{humanize $value}} Mbps.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-speedtest-1-2) 6.2.2. SpeedTest Slow Internet Upload

    Internet upload speed is currently {{humanize $value}} Mbps.[copy]

    ```
      - alert: SpeedtestSlowInternetUpload
        expr: avg_over_time(speedtest_upload[10m]) < 20
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: SpeedTest Slow Internet Upload (instance {{ $labels.instance }})
          description: "Internet upload speed is currently {{humanize $value}} Mbps.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#zfs-1) 6.3. ZFS : [node-exporter](https://github.com/prometheus/node_exporter)

  ```
    // @TODO: Please contribute => https://github.com/samber/awesome-prometheus-alerts 👋
    
  ```


------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#openebs-1) 6.4. OpenEBS : Embedded exporter (1 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-openebs-1-1) 6.4.1. OpenEBS used pool capacity

    OpenEBS Pool use more than 80% of his capacity[copy]

    ```
      - alert: OpenebsUsedPoolCapacity
        expr: openebs_used_pool_capacity_percent > 80
        for: 2m
        labels:
          severity: warning
        annotations:
          summary: OpenEBS used pool capacity (instance {{ $labels.instance }})
          description: "OpenEBS Pool use more than 80% of his capacity\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#minio-1) 6.5. Minio : Embedded exporter (2 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-minio-1-1) 6.5.1. Minio disk offline

    Minio disk is offline[copy]

    ```
      - alert: MinioDiskOffline
        expr: minio_disks_offline > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Minio disk offline (instance {{ $labels.instance }})
          description: "Minio disk is offline\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-minio-1-2) 6.5.2. Minio disk space usage

    Minio available free space is low (< 10%)[copy]

    ```
      - alert: MinioDiskSpaceUsage
        expr: disk_storage_available / disk_storage_total * 100 < 10
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Minio disk space usage (instance {{ $labels.instance }})
          description: "Minio available free space is low (< 10%)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#ssl/tls-1) 6.6. SSL/TLS : [ssl_exporter ](https://github.com/ribbybibby/ssl_exporter)(4 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ssl/tls-1-1) 6.6.1. SSL certificate probe failed

    Failed to fetch SSL information {{ $labels.instance }}[copy]

    ```
      - alert: SslCertificateProbeFailed
        expr: ssl_probe_success == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: SSL certificate probe failed (instance {{ $labels.instance }})
          description: "Failed to fetch SSL information {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ssl/tls-1-2) 6.6.2. SSL certificate OSCP status unknown

    Failed to get the OSCP status {{ $labels.instance }}[copy]

    ```
      - alert: SslCertificateOscpStatusUnknown
        expr: ssl_ocsp_response_status == 2
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: SSL certificate OSCP status unknown (instance {{ $labels.instance }})
          description: "Failed to get the OSCP status {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ssl/tls-1-3) 6.6.3. SSL certificate revoked

    SSL certificate revoked {{ $labels.instance }}[copy]

    ```
      - alert: SslCertificateRevoked
        expr: ssl_ocsp_response_status == 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: SSL certificate revoked (instance {{ $labels.instance }})
          description: "SSL certificate revoked {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-ssl/tls-1-4) 6.6.4. SSL certificate expiry (< 7 days)

    {{ $labels.instance }} Certificate is expiring in 7 days[copy]

    ```
      - alert: SslCertificateExpiry(<7Days)
        expr: ssl_verified_cert_not_after{chain_no="0"} - time() < 86400 * 7
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: SSL certificate expiry (< 7 days) (instance {{ $labels.instance }})
          description: "{{ $labels.instance }} Certificate is expiring in 7 days\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#juniper-1) 6.7. Juniper : [czerwonk/junos_exporter ](https://github.com/czerwonk/junos_exporter)(3 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-juniper-1-1) 6.7.1. Juniper switch down

    The switch appears to be down[copy]

    ```
      - alert: JuniperSwitchDown
        expr: junos_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Juniper switch down (instance {{ $labels.instance }})
          description: "The switch appears to be down\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-juniper-1-2) 6.7.2. Juniper high Bandwidth Usage 1GiB

    Interface is highly saturated. (> 0.90GiB/s)[copy]

    ```
      - alert: JuniperHighBandwidthUsage1gib
        expr: rate(junos_interface_transmit_bytes[1m]) * 8 > 1e+9 * 0.90
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: Juniper high Bandwidth Usage 1GiB (instance {{ $labels.instance }})
          description: "Interface is highly saturated. (> 0.90GiB/s)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-juniper-1-3) 6.7.3. Juniper high Bandwidth Usage 1GiB

    Interface is getting saturated. (> 0.80GiB/s)[copy]

    ```
      - alert: JuniperHighBandwidthUsage1gib
        expr: rate(junos_interface_transmit_bytes[1m]) * 8 > 1e+9 * 0.80
        for: 1m
        labels:
          severity: warning
        annotations:
          summary: Juniper high Bandwidth Usage 1GiB (instance {{ $labels.instance }})
          description: "Interface is getting saturated. (> 0.80GiB/s)\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#coredns-1) 6.8. CoreDNS : Embedded exporter (1 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-coredns-1-1) 6.8.1. CoreDNS Panic Count

    Number of CoreDNS panics encountered[copy]

    ```
      - alert: CorednsPanicCount
        expr: increase(coredns_panics_total[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: CoreDNS Panic Count (instance {{ $labels.instance }})
          description: "Number of CoreDNS panics encountered\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#freeswitch-1) 6.9. Freeswitch : [znerol/prometheus-freeswitch-exporter ](https://pypi.org/project/prometheus-freeswitch-exporter)(3 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-freeswitch-1-1) 6.9.1. Freeswitch down

    Freeswitch is unresponsive[copy]

    ```
      - alert: FreeswitchDown
        expr: freeswitch_up == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Freeswitch down (instance {{ $labels.instance }})
          description: "Freeswitch is unresponsive\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-freeswitch-1-2) 6.9.2. Freeswitch Sessions Warning

    High sessions usage on {{ $labels.instance }}: {{ $value | printf "%.2f"}}%[copy]

    ```
      - alert: FreeswitchSessionsWarning
        expr: (freeswitch_session_active * 100 / freeswitch_session_limit) > 80
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: Freeswitch Sessions Warning (instance {{ $labels.instance }})
          description: "High sessions usage on {{ $labels.instance }}: {{ $value | printf \"%.2f\"}}%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-freeswitch-1-3) 6.9.3. Freeswitch Sessions Critical

    High sessions usage on {{ $labels.instance }}: {{ $value | printf "%.2f"}}%[copy]

    ```
      - alert: FreeswitchSessionsCritical
        expr: (freeswitch_session_active * 100 / freeswitch_session_limit) > 90
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: Freeswitch Sessions Critical (instance {{ $labels.instance }})
          description: "High sessions usage on {{ $labels.instance }}: {{ $value | printf \"%.2f\"}}%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#hashicorp-vault-1) 6.10. Hashicorp Vault : [Embedded exporter ](https://github.com/hashicorp/vault/blob/master/website/content/docs/configuration/telemetry.mdx#prometheus)(3 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-hashicorp-vault-1-1) 6.10.1. Vault sealed

    Vault instance is sealed on {{ $labels.instance }}[copy]

    ```
      - alert: VaultSealed
        expr: vault_core_unsealed == 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Vault sealed (instance {{ $labels.instance }})
          description: "Vault instance is sealed on {{ $labels.instance }}\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-hashicorp-vault-1-2) 6.10.2. Vault too many pending tokens

    Too many pending tokens {{ $labels.instance }}: {{ $value | printf "%.2f"}}%[copy]

    ```
      - alert: VaultTooManyPendingTokens
        expr: avg(vault_token_create_count - vault_token_store_count) > 0
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Vault too many pending tokens (instance {{ $labels.instance }})
          description: "Too many pending tokens {{ $labels.instance }}: {{ $value | printf \"%.2f\"}}%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-hashicorp-vault-1-3) 6.10.3. Vault too many infinity tokens

    Too many infinity tokens {{ $labels.instance }}: {{ $value | printf "%.2f"}}%[copy]

    ```
      - alert: VaultTooManyInfinityTokens
        expr: vault_token_count_by_ttl{creation_ttl="+Inf"} > 3
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: Vault too many infinity tokens (instance {{ $labels.instance }})
          description: "Too many infinity tokens {{ $labels.instance }}: {{ $value | printf \"%.2f\"}}%\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#thanos-1) 7.1. Thanos (3 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-thanos-1-1) 7.1.1. Thanos compaction halted

    Thanos compaction has failed to run and is now halted.[copy]

    ```
      - alert: ThanosCompactionHalted
        expr: thanos_compact_halted == 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Thanos compaction halted (instance {{ $labels.instance }})
          description: "Thanos compaction has failed to run and is now halted.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-thanos-1-2) 7.1.2. Thanos compact bucket operation failure

    Thanos compaction has failing storage operations[copy]

    ```
      - alert: ThanosCompactBucketOperationFailure
        expr: rate(thanos_objstore_bucket_operation_failures_total[1m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Thanos compact bucket operation failure (instance {{ $labels.instance }})
          description: "Thanos compaction has failing storage operations\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-thanos-1-3) 7.1.3. Thanos compact not run

    Thanos compaction has not run in 24 hours.[copy]

    ```
      - alert: ThanosCompactNotRun
        expr: (time() - thanos_objstore_bucket_last_successful_upload_time) > 24*60*60
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Thanos compact not run (instance {{ $labels.instance }})
          description: "Thanos compaction has not run in 24 hours.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#loki-1) 7.2. Loki (4 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-loki-1-1) 7.2.1. Loki process too many restarts

    A loki process had too many restarts (target {{ $labels.instance }})[copy]

    ```
      - alert: LokiProcessTooManyRestarts
        expr: changes(process_start_time_seconds{job=~"loki"}[15m]) > 2
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Loki process too many restarts (instance {{ $labels.instance }})
          description: "A loki process had too many restarts (target {{ $labels.instance }})\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-loki-1-2) 7.2.2. Loki request errors

    The {{ $labels.job }} and {{ $labels.route }} are experiencing errors[copy]

    ```
      - alert: LokiRequestErrors
        expr: 100 * sum(rate(loki_request_duration_seconds_count{status_code=~"5.."}[1m])) by (namespace, job, route) / sum(rate(loki_request_duration_seconds_count[1m])) by (namespace, job, route) > 10
        for: 15m
        labels:
          severity: critical
        annotations:
          summary: Loki request errors (instance {{ $labels.instance }})
          description: "The {{ $labels.job }} and {{ $labels.route }} are experiencing errors\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-loki-1-3) 7.2.3. Loki request panic

    The {{ $labels.job }} is experiencing {{ printf "%.2f" $value }}% increase of panics[copy]

    ```
      - alert: LokiRequestPanic
        expr: sum(increase(loki_panic_total[10m])) by (namespace, job) > 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: Loki request panic (instance {{ $labels.instance }})
          description: "The {{ $labels.job }} is experiencing {{ printf \"%.2f\" $value }}% increase of panics\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-loki-1-4) 7.2.4. Loki request latency

    The {{ $labels.job }} {{ $labels.route }} is experiencing {{ printf "%.2f" $value }}s 99th percentile latency[copy]

    ```
      - alert: LokiRequestLatency
        expr: (histogram_quantile(0.99, sum(rate(loki_request_duration_seconds_bucket{route!~"(?i).*tail.*"}[5m])) by (le)))  > 1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: Loki request latency (instance {{ $labels.instance }})
          description: "The {{ $labels.job }} {{ $labels.route }} is experiencing {{ printf \"%.2f\" $value }}s 99th percentile latency\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#promtail-1) 7.3. Promtail (2 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-promtail-1-1) 7.3.1. Promtail request errors

    The {{ $labels.job }} {{ $labels.route }} is experiencing {{ printf "%.2f" $value }}% errors.[copy]

    ```
      - alert: PromtailRequestErrors
        expr: 100 * sum(rate(promtail_request_duration_seconds_count{status_code=~"5..|failed"}[1m])) by (namespace, job, route, instance) / sum(rate(promtail_request_duration_seconds_count[1m])) by (namespace, job, route, instance) > 10
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: Promtail request errors (instance {{ $labels.instance }})
          description: "The {{ $labels.job }} {{ $labels.route }} is experiencing {{ printf \"%.2f\" $value }}% errors.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-promtail-1-2) 7.3.2. Promtail request latency

    The {{ $labels.job }} {{ $labels.route }} is experiencing {{ printf "%.2f" $value }}s 99th percentile latency.[copy]

    ```
      - alert: PromtailRequestLatency
        expr: histogram_quantile(0.99, sum(rate(promtail_request_duration_seconds_bucket[5m])) by (le)) > 1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: Promtail request latency (instance {{ $labels.instance }})
          description: "The {{ $labels.job }} {{ $labels.route }} is experiencing {{ printf \"%.2f\" $value }}s 99th percentile latency.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  ------

- ## [#](https://awesome-prometheus-alerts.grep.to/rules#cortex-1) 7.4. Cortex (6 rules)[copy section]

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cortex-1-1) 7.4.1. Cortex ruler configuration reload failure

    Cortex ruler configuration reload failure (instance {{ $labels.instance }})[copy]

    ```
      - alert: CortexRulerConfigurationReloadFailure
        expr: cortex_ruler_config_last_reload_successful != 1
        for: 0m
        labels:
          severity: warning
        annotations:
          summary: Cortex ruler configuration reload failure (instance {{ $labels.instance }})
          description: "Cortex ruler configuration reload failure (instance {{ $labels.instance }})\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cortex-1-2) 7.4.2. Cortex not connected to Alertmanager

    Cortex not connected to Alertmanager (instance {{ $labels.instance }})[copy]

    ```
      - alert: CortexNotConnectedToAlertmanager
        expr: cortex_prometheus_notifications_alertmanagers_discovered < 1
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cortex not connected to Alertmanager (instance {{ $labels.instance }})
          description: "Cortex not connected to Alertmanager (instance {{ $labels.instance }})\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cortex-1-3) 7.4.3. Cortex notification are being dropped

    Cortex notification are being dropped due to errors (instance {{ $labels.instance }})[copy]

    ```
      - alert: CortexNotificationAreBeingDropped
        expr: rate(cortex_prometheus_notifications_dropped_total[5m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cortex notification are being dropped (instance {{ $labels.instance }})
          description: "Cortex notification are being dropped due to errors (instance {{ $labels.instance }})\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cortex-1-4) 7.4.4. Cortex notification error

    Cortex is failing when sending alert notifications (instance {{ $labels.instance }})[copy]

    ```
      - alert: CortexNotificationError
        expr: rate(cortex_prometheus_notifications_errors_total[5m]) > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cortex notification error (instance {{ $labels.instance }})
          description: "Cortex is failing when sending alert notifications (instance {{ $labels.instance }})\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cortex-1-5) 7.4.5. Cortex ingester unhealthy

    Cortex has an unhealthy ingester[copy]

    ```
      - alert: CortexIngesterUnhealthy
        expr: cortex_ring_members{state="Unhealthy", name="ingester"} > 0
        for: 0m
        labels:
          severity: critical
        annotations:
          summary: Cortex ingester unhealthy (instance {{ $labels.instance }})
          description: "Cortex has an unhealthy ingester\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```

  - #### [#](https://awesome-prometheus-alerts.grep.to/rules#rule-cortex-1-6) 7.4.6. Cortex frontend queries stuck

    There are queued up queries in query-frontend.[copy]

    ```
      - alert: CortexFrontendQueriesStuck
        expr: sum by (job) (cortex_query_frontend_queue_length) > 0
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: Cortex frontend queries stuck (instance {{ $labels.instance }})
          description: "There are queued up queries in query-frontend.\n  VALUE = {{ $value }}\n  LABELS = {{ $labels }}"
    ```