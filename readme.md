# Issue: React app doesnt retrieve posts - possible problem with query-srv

Solution:
Checked all the pods with recent changes and only query pod was running for much longer than the rest indicating that deployment wasnt restarted properly.
Made sure deployments uses the latest query service image with kubectl apply -f query-depl.
Restarted deployment with kubectl rollout restart deployment query-depl.
